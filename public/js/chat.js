var socket=io();

function scrollToBottom(){
//selector
var message=jQuery('#message');
var newMessage=message.children('li:last-child'); //selector for  newly created message
//height
var clientHeight=message.prop('clientHeight');   //prop method gives us a cross browser way to fetch a property
var scrollTop=message.prop('scrollTop') ;
var scrollHeight=message.prop('scrollHeight');
var newMessageHeight=newMessage.innerHeight();
var lastMessageHeight=newMessage.prev().innerHeight();   //height of recent previous message

if(scrollTop+clientHeight+newMessageHeight+lastMessageHeight<=scrollHeight){
	message.scrollTop(scrollHeight);
}
}


socket.on('connect',function(){
	console.log('connected to server');
});
socket.on('disconnect',function(){
	console.log('disconnected from the server');
});


//listen the newMessage event
socket.on('newMessage',function(message){
	var formatedTime=moment(message.CreatedAt).format('h:mm a');
	var template=jQuery('#message-template').html();
	var html=Mustache.render(template,{
		from: message.from,
		text: message.text,
		CreatedAt: formatedTime
	});
	jQuery('#message').append(html);
	scrollToBottom();
});

//listen the newLocationMessage preventDefault
socket.on('newLocationMessage',function(message){
	var formatedTime=moment(message.CreatedAt).format('h:mm a');
	var location=jQuery('#locationMessage-template').html();
	var html=Mustache.render(location,{
		from: message.from,
		url: message.url,
		CreatedAt: formatedTime,
	});
	jQuery('#message').append(html);
	scrollToBottom();
});



//socket.emit() is to emit the event.
//in client side we refer a regular type function insted of arrow because all older browser does not
//support latest javascript technology



jQuery('#message-form').on('submit',function(e){
	e.preventDefault();
	socket.emit('createMessage',{
		text: jQuery('[name=message]').val(),
	});
	jQuery('[name=message]').val('');
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
