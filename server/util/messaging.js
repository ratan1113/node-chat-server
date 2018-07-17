//store utility function related to messaging
const moment=require('moment');
var generateMessage=(from,text)=>{
	return {
		from,
		text,
		CreatedAt: moment().valueOf()
	};

};

var generateLocationMessage=(from,latitude,longitude)=>{
	return {
		from,
		url: `https://www.google.com/maps?q=${latitude},${longitude}`,
		CreatedAt: moment().valueOf()
	}
};

module.exports={generateMessage,generateLocationMessage};





//install mocha and expect assertion library to test the created utilited functions
