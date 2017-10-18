import moment from 'moment';
import writtenNumber from 'written-number';

import {
	Terrain
} from '../../lib/class/terrain';
import {
	User
} from '../../lib/class/user';

writtenNumber.defaults.lang = 'es';
export class Contract {
	constructor(args) {

		if (args["data"]) {
			args["dateCreation"] = JSON.parse(args["dateCreation"]);
			args["dateStart"] = JSON.parse(args["dateStart"]);
			args["terrain"] = new Terrain(args["terrain"]);
			args["user"] = new User(args["user"]);
			Object.assign(this, args);
		}

		this.id = "";
		this.user = args["user"];
		this.terrain = args["terrain"];

		this.dateCreation = (args["dateCreation"]) ? new Date(args["dateCreation"]) : new Date();
		this.dateStart = new Date(args["dateStart"]);
		this.dateEnd = new Date(this.dateStart.toLocaleDateString());
		this.dateEnd.setFullYear(this.dateEnd.getFullYear() + 3);
		this.dateMin = new Date(this.dateStart.toLocaleDateString());
		this.dateMin.setMonth(this.dateMin.getMonth() + 6);

		this.price = args["price"];
		this.text = args["text"];

	}

	_createObject(args) {
		args["dateCreation"] = JSON.parse(args["dateCreation"]);
		args["dateStart"] = JSON.parse(args["dateStart"]);
		Object.assign(this, args);
	}

	getDateStart() {
		let date =
			this.dateStart.getFullYear() + "-" +
			this.dateStart.getMonth() + "-" +
			this.dateStart.getDate();

		return date;
	}

	getTitle() {

		let title =
			this.getDateStart() + " " +
			this.user.getFullName() + " " +
			this.terrain.getTitle();

		return title;

		//"30-05-2016 Yendry Artavia Peña 9K-4"
	}

	getPath(){
		return this.getTerrainId() + "/" + this.getContractId();
	}

	getTerrainId() {
		let terrain = this.terrain.name.toLowerCase();
		terrain = terrain.replace(new RegExp(' ', 'gi'), "-");
		return terrain;
	}

	getContractId() {
		let id = this.getTitle();
		id = id.replace(new RegExp(' ', 'gi'), "-");
		return id;
	}

	getTextContract() {

		//this.text = this.text.replace(/\${fullName}/g, 'casa');
		//this.text = this.text.replace(new RegExp('Molino', 'gi'), 'Heredia');

		this.text = this.text.replace(new RegExp('\\${fullNameUpperCase}', 'gi'), this.user.getFullName().toUpperCase());
		this.text = this.text.replace(new RegExp('\\${fullName}', 'gi'), this.user.getFullName());
		this.text = this.text.replace(new RegExp('\\${identificationType\}', 'gi'), this.user.identificationType);
		this.text = this.text.replace(new RegExp('\\${identification\}', 'gi'), this.user.identification);

		this.text = this.text.replace(new RegExp('\\${nise\}', 'gi'), this.terrain.nise);

		this.text = this.text.replace(new RegExp('\\${dateStart\}', 'gi'), this.convertDateToWords(this.dateStart));
		this.text = this.text.replace(new RegExp('\\${dateEnd\}', 'gi'), this.convertDateToWords(this.dateEnd));
		this.text = this.text.replace(new RegExp('\\${dateMin\}', 'gi'), this.convertDateToWords(this.dateMin));


		let price = parseInt(this.price);
		price = writtenNumber(this.price);
		this.text = this.text.replace(new RegExp('\\${price\}', 'gi'), price + " colones");

		let fiscalValue = parseInt(this.price) * 6;
		fiscalValue = writtenNumber(fiscalValue);
		this.text = this.text.replace(new RegExp('\\${fiscalValue\}', 'gi'), fiscalValue + " colones");

		this.text = this.text.replace(new RegExp('\\${phone\}', 'gi'), this.user.phone);
		return this.text;
		//console.log(this.text);
	}

	getData() {
		let data = JSON.parse(JSON.stringify(this));
		data.dateCreation = JSON.stringify(data.dateCreation);
		data.dateStart = JSON.stringify(data.dateStart);
		data.dateEnd = JSON.stringify(data.dateEnd);
		data.dateMin = JSON.stringify(data.dateMin);

		return data;
	}

	convertDateToWords(ObjDate) {

		let momentDate = moment(ObjDate.toISOString());
		momentDate.locale('es');
		let textDate = momentDate.format('LL');

		let dayName = writtenNumber(ObjDate.getDate());
		textDate = textDate.replace(ObjDate.getDate(), dayName);

		let yearName = writtenNumber(ObjDate.getFullYear());
		textDate = textDate.replace(ObjDate.getFullYear(), yearName);

		return textDate;
	}

}
