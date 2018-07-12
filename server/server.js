const path=require('path');
const express=require('express');

const publicPath=path.join(__dirname,'../public');
// console.log(publicPath);
// console.log(__dirname);
// console.log(__dirname+'../public');

const app=express();

//setting a middleware to render public files:
app.use(express.static(publicPath));
//
// app.get('/',(req,res)=>{
// 	res.send('<h2>welcome to main page of the project</h2>');
// });




app.listen(3000,()=>{
	console.log('server started at port 3000');
});
