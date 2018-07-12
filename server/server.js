const path=require('path');
const express=require('express');
const http=require('http');
const socketIO=require('socket.io');

const publicPath=path. join(__dirname,'../public');
const port=process.env.PORT||3000;
// console.log(publicPath);
// console.log(__dirname);
// console.log(__dirname+'../public');

//create an express object
const app=express();

//create a server using http node_modules
var server=http.createServer(app);

//create an IO variable to communicate client and server asynchronusly
var io=socketIO(server);

//setting a middleware to render public files:
app.use(express.static(publicPath));
//
// app.get('/',(req,res)=>{
// 	res.send('<h2>welcome to main page of the project</h2>');
// });

//io.on method let you register a event listener .which will called when the event is occure
io.on('connection',(socket)=>{
	console.log('new user connected');

	socket.on('disconnect',()=>{
		console.log('user is disconnected');
	});

	//.emit() method is to emit the event
	// socket.emit('newEmail',{
	// 	to: "ratan@example.com",
	// 	text: "hey whats up man!",
	//
	// });

	//get email from the client
// 	socket.on('getEmail',(email)=>{
// 		console.log('new email received',email);
// 	});

	socket.emit('newMessage',{
		from: "ratan@example.com",
		text: "hello everybody",
		CreatedAt: "12 am",
	});

	socket.on('createMessage',(message)=>{
		console.log('message received from client',message);
	})

 });




server.listen(port,()=>{
	console.log(`server started at port ${port}`);
});
