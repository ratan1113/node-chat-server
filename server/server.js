const path=require('path');
const express=require('express');
const http=require('http');
const socketIO=require('socket.io');

const publicPath=path. join(__dirname,'../public');
const port=process.env.PORT||3000;
var {generateMessage,generateLocationMessage}=require('./util/messaging');
var {isRealString}=require('./util/validation');
const {Users}=require('./util/users');

//create an express object
const app=express();

//create a server using http node_modules
var server=http.createServer(app);

//create an IO variable to communicate client and server asynchronusly
var io=socketIO(server);

//create instanse of the user createLocationMessage
var users=new Users();

//setting a middleware to render public files:
app.use(express.static(publicPath));



//io.on method let you register a event listener .which will called when the event is occure
io.on('connection',(socket)=>{
	console.log('new user connected');


	socket.on('join',(param,callback)=>{
		if(!isRealString(param.name)|| !isRealString(param.room)){
			return callback('name and room name are required');
		}
		socket.join(param.room);   //join to room
		//socket.leave('room name') or (roomobj)
		//io.emit()   ----->io.to('roomname').emit()
		//socket.broadcast.emit()  ---->socket.broadcast.to('roo name').emit()
		//socket.emit()
		users.removeUser(socket.id);
		users.addUser(socket.id,param.name,param.room);
		io.to(param.room).emit('updateUserList',users.getUserList(param.room));
		socket.broadcast.to(param.room).emit('newMessage',generateMessage('admin',`${param.name} has joined the room`));


		callback();
	});

	//listen the event createMessage and print it on console
	socket.on('createMessage',(message)=>{
		var user=users.getUser(socket.id);
		if(user && isRealString(message.text)){
				io.to(user.room).emit('newMessage',generateMessage(user.name, message.text));
		}
	
	});
	socket.on('createLocationMessage',(coords)=>{
		io.emit('newLocationMessage',generateLocationMessage('admin',coords.latitude,coords.longitude));
	});

	socket.on('disconnect',()=>{
		var user = users.removeUser(socket.id);
		if(user){
		io.to(user.room).emit('updateUserList',users.getUserList(user.room));
		io.to(user.room).emit('newMessage',generateMessage('admin',`${user.name} has left `));
		}
		console.log('user disconnected',user);
	});

 });




server.listen(port,()=>{
	console.log(`server started at port ${port}`);
});
