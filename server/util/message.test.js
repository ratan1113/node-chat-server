var expect=require('expect');

var {generateMessage}=require('./messaging');

describe('generateMessage', ()=>{
	it('should generate correct message object',()=>{
		var from='jen';
		var text='some message';
		var message=generateMessage(from,text);
		//expect(new generateMessage('jen','some message')).toBeA(message);
		expect(message.CreatedAt).toBeA('number');
		expect(message).toInclude({from,text});
	});


	//include response in variable
	//assert text match
	//assert from match
	//assert CreatedAt match to be a number
});
