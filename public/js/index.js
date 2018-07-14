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
	console.log('message received',message);
	var li=jQuery('<li></li>');
	li.text(`${message.from} : ${message.text}`);
	jQuery('#message-list').append(li);
});



//socket.emit() is to emit the event.
//in client side we refer a regular type function insted of arrow because all older browser does not
//support latest javascript technology



jQuery('#message-form').on('submit',function(e){
	e.preventDefault();
	socket.emit('createMessage',{
		from: 'User',
		text: jQuery('[name=message]').val(),
	},function(data){
		console.log('response from server: ',data);
	});
});
