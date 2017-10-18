export class User {
  constructor(args) {

    this.identification = args["identification"];
     this.identificationType = args["identificationType"];

    this.firstNameOne = args["firstNameOne"];
    this.firstNameTwo = args["firstNameTwo"];
    this.lastNameOne = args["lastNameOne"];
    this.lastNameTwo = args["lastNameTwo"];

    this.phone = args["phone"];
    this.email = args["email"];

  }

  getFullName(){
      let name = this.firstNameOne;
      name += (this.firstNameTwo != "")? " " + this.firstNameTwo : "";
      name += " " + this.lastNameOne;
      name += " " + this.lastNameTwo;

      return name;
  }
}
