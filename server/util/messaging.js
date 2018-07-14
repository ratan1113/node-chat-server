//store utility function related to messaging

var generateMessage=(from,text)=>{
	return {
		from,
		text,
		CreatedAt: new Date().getTime()
	};

};

module.exports={generateMessage};




//install mocha and expect assertion library to test the created utilited functions
