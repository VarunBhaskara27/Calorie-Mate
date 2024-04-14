function Staff(name) {
  this.name = name;
}

Staff.prototype.getName = function () {
  return this.name;
};

const staff = new Staff("Dwight");

function Manager(name, dept) {
  this.name = name;
  this.dept = dept;
}

Manager.prototype.getDept = function () {
  return this.dept;
};

const manager = new Manager("Michael", "Sales");

manager.__proto__.__proto__ = Staff.prototype;

console.log(manager.getName());
