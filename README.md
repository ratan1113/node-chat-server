# node-chat-server


This section contain piece of code and comments of the programming

//this code is demo for path.
|   const publicPath=path. join(__dirname,'../public');
|   console.log(publicPath);
|   console.log(__dirname);
|   console.log(__dirname+'../public');

//emiting event:
	1.builtin event like 'connection','disconnect'
	2.custom event like 'newMessage', 'createMessage'etc
|		//io.emit()  emit event to every single connection
|		//socket.emit() emit the event in single connection
|		//socket.emit.broadcast() emit event to every single connection excpt source connection

|		socket.broadcast.emit('newMessage',{
|			from: message.from,
|			text: message.text,
|			CreatedAt: new Date().getTime()
|		});
|		});


//event Acknowledgement :

on client side:-
socket.on('connect',function(){
	console.log('connected to server');

	socket.emit('createMessage',{
		from: "someone",
		text: "hello server",
	},function(data){
		console.log('got it:',data);
		});
});

on server side:-
io.on('connection',(socket)=>{
	console.log('new user connected');
	socket.on('createMessage',(message,callback)=>{
		console.log('create message',message);
		callback('this is from the server');
		})
});



// var li=jQuery('<li></li>');
// var a=jQuery('<a target="_blank">click to show the my location</a>');
// li.text(`${message.from} ${formatedTime}: `);
// a.attr('href',message.url);
// li.append(a);
// jQuery('#message-list').append(li);
