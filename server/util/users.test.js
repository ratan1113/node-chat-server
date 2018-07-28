const expect=require('expect');

const {Users}=require('./users');

describe('addUser',()=>{
	var tusers;
	beforeEach(()=>{
		tusers= new Users();
		tusers.users=[{
			id:1,
			name: "mike",
			room: "hellogroup"
		},
		{
			id:2,
			name:"egnoi",
			room:"hellogroup"
		},
	{
		id:3,
		name:'ratan',
		room:'node course'
	}] ;       //add some initilized data
});
	it('should add a user object to users array',()=>{
		var t1users=new Users();
		var user={
			id: 111,
			name: "ratan",
			room: "learninghomies"
		};
	var resUser=	t1users.addUser(user.id,user.name,user.room);
		expect(t1users.users).toEqual([user]);
	});

		it('should list users name of node course room',()=>{
			var userList=tusers.getUserList('node course');
			expect(userList).toEqual(['ratan']);
		});

		it('should find a user',()=>{
			// var finduser=tusers.getUser(1);
			// expect(finduser).toEqual({
			// 	id:1,
			// 	name: "mike",
			// 	room: "hellogroup"}
			// );

			var userId=1;
			var finduser=tusers.getUser(userId);
			expect(finduser.id).toBe(userId);
		});

		it('should not find a user',()=>{
			var userId=99;
			var finduser=tusers.getUser(userId);
			expect(finduser).doNotExist();
		});

		it('should remove a user',()=>{
			var userId=1;
			var removeuser=tusers.removeUser(userId);
			expect(removeuser.id).toBe(userId);
		});

		it('should not remove a user',()=>{

		});



});
