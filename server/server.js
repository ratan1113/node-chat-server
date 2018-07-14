const path=require('path');
const express=require('express');
const http=require('http');
const socketIO=require('socket.io');

const publicPath=path. join(__dirname,'../public');
const port=process.env.PORT||3000;
var {generateMessage}=require('./util/messaging');

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

	//emit the message to using simplified function instead of object.
	socket.emit('newMessage' , generateMessage('admin','hello users youb are welcome') );


	//listen the event createMessage and print it on console
	socket.on('createMessage',(message)=>{
		console.log('message received from client',message);

		//io.emit()  emit event to every single connection
		//socket.emit() emit the event in single connection
		//socket.emit.broadcast() emit event to every single connection excpt source connection

		socket.broadcast.emit('newMessage',{
			from: message.from,
			text: message.text,
			CreatedAt: new Date().getTime()
		});
	});

 });




server.listen(port,()=>{
	console.log(`server started at port ${port}`);
});
