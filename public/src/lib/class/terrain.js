export class Terrain {

  constructor(args) {
    this.id = args["id"];
    this.number = args["number"];
    this.name = args["name"];
    this.type = args["type"];
    this.nise = args["nise"];
  }

  getTitle(){
  	let title = this.name;
  	title += (this.number)? "-" + this.number : "";

  	return title;
  }

}
