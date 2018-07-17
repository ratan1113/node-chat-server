//store utility function related to messaging

var generateMessage=(from,text)=>{
	return {
		from,
		text,
		CreatedAt: new Date().getTime()
	};

};

var generateLocationMessage=(from,latitude,longitude)=>{
	return {
		from,
		url: `https://www.google.com/maps?q=${latitude},${longitude}`,
		CreatedAt: new Date().getTime()
	}
};

module.exports={generateMessage,generateLocationMessage};





//install mocha and expect assertion library to test the created utilited functions
