const path=require('path');
const express=require('express');
const http=require('http');
const socketIO=require('socket.io');

const publicPath=path. join(__dirname,'../public');
const port=process.env.PORT||3000;
var {generateMessage,generateLocationMessage}=require('./util/messaging');

//create an express object
const app=express();

//create a server using http node_modules
var server=http.createServer(app);

//create an IO variable to communicate client and server asynchronusly
var io=socketIO(server);

//setting a middleware to render public files:
app.use(express.static(publicPath));



//io.on method let you register a event listener .which will called when the event is occure
io.on('connection',(socket)=>{
	console.log('new user connected');

	socket.on('disconnect',()=>{
		console.log('user is disconnected');
	});

	//listen the event createMessage and print it on console
	socket.on('createMessage',(message,callback)=>{
		io.emit('newMessage',{
			from: message.from,
			text: message.text,
			CreatedAt: new Date().getTime()
		});
		callback('message broadcasted');
	});
	//
	socket.on('createLocationMessage',(coords)=>{
		io.emit('newLocationMessage',generateLocationMessage('admin',coords.latitude,coords.longitude));
	});

 });




server.listen(port,()=>{
	console.log(`server started at port ${port}`);
});
