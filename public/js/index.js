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
	var formatedTime=moment(message.CreatedAt).format('h:mm a');
	var li=jQuery('<li></li>');
	li.text(`${message.from} ${formatedTime}: ${message.text}`);
	jQuery('#message-list').append(li);
});

//listen the newLocationMessage preventDefault
socket.on('newLocationMessage',function(message){
	//display the data coming from createServer
	var formatedTime=moment(message.CreatedAt).format('h:mm a');
	var li=jQuery('<li></li>');
	var a=jQuery('<a target="_blank">click to show the my location</a>');
	li.text(`${message.from} ${formatedTime}: `);
	a.attr('href',message.url);
	li.append(a);
	jQuery('#message-list').append(li);
});



//socket.emit() is to emit the event.
//in client side we refer a regular type function insted of arrow because all older browser does not
//support latest javascript technology



jQuery('#message-form').on('submit',function(e){
	e.preventDefault();
	socket.emit('createMessage',{
		from: jQuery('[name=message-from]').val(),
		text: jQuery('[name=message]').val(),
	},function(data){
		//clear the message content from input field after receiving the message by setting it empty
		jQuery('[name=message]').val('');
	});
});

//create event for the sendlocation button
var locationButton=jQuery('#send-location');
locationButton.on('click',function(){
	 //check if browser support location service
	 if(!navigator.geolocation){
		 return alert('your browser does not support geolocation service');
	 }
	 locationButton.attr('disabled','disabled').text('sending location....');
	 navigator.geolocation.getCurrentPosition(function(position){
		 locationButton.removeAttr('disabled').text('send location');
		 //console.log(position);
		 socket.emit('createLocationMessage',{
			 latitude: position.coords.latitude,
			 longitude: position.coords.longitude,

		 });
	 },function(){
		 locationButton.removeAttr('disabled').text('send location');
		 alert('unable to fetch location');
	 });
});
