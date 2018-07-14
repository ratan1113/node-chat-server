# node-chat-server


This section contain piece of code and comments of the programming

//this code is demo for path.
|   const publicPath=path. join(__dirname,'../public');
|   console.log(publicPath);
|   console.log(__dirname);
|   console.log(__dirname+'../public');


//io.emit()  emit event to every single connection
//socket.emit() emit the event in single connection
//socket.emit.broadcast() emit event to every single connection excpt source connection

socket.broadcast.emit('newMessage',{
	from: message.from,
	text: message.text,
	CreatedAt: new Date().getTime()
});
});
