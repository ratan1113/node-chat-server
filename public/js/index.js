var socket=io();
socket.on('connect',function(){
	console.log('connected to server');

	// socket.emit('createMessage',{
	// 	from: "someone",
	// 	text: "hello server",
	// });
});
socket.on('disconnect',function(){
	console.log('disconnected from the server');
});


//listen the newMessage event
socket.on('newMessage',function(message){
	console.log('email received',message);
})



//socket.emit() is to emit the event.
//in client side we refer a regular type function insted of arrow because all older browser does not
//support latest javascript technology
