function Room(){
	this.name = name;
	this.id = id;
	this.owner = owner;
	this.people = [];
	this.status = available;
}

Room.prototype.addPerson = function(person){
	if(this.status == available){
		this.people.push(person);
	}
};

module.exports = Room;