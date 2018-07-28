var expect=require('expect');

const {isRealString}=require('./validation');
describe('isRealString',()=>{
	it('it should check if given string is real or not',()=>{
		var res=isRealString(98);
		expect(res).toBe(false);
	});
	it('it should check if given string is real or not',()=>{
		var res=isRealString('  ');
		expect(res).toBe(false);
	});
	it('it should check if given string is real or not',()=>{
		var res=isRealString('ratan');
		expect(res).toBe(true);
	});
});
