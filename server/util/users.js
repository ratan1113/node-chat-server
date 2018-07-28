//contain very user's nformation

//addUser(id,name);
//remove user(id)
//getUser(id)
//getUserList(room)

class Users {
	constructor() {
		this.users=[];
	}
	addUser(id,name,room){
		var user={id,name,room};
		this.users.push(user);
		return user;
	}
	removeUser(id){
		//remove a user and returned the removed user
		var user=this.getUser(id);
		if(user){
			this.users=this.users.filter((user)=>user.id!==id);
			return user;
		}

	}
	getUser(id){
		return this.users.filter((user)=>user.id===id)[0];
	}
	getUserList(room){
		//return list of user ['ratan','ram','jdfj'] just like this
		var users=this.users.filter((user)=>{
			return user.room===room;
		});
		var nameArray=users.map((user)=>user.name);
		return nameArray
	}
}

module.exports={Users};
