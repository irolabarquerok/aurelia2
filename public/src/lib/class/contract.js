import moment from 'moment';
import writtenNumber  from 'written-number';

writtenNumber.defaults.lang = 'es';
export class Contract {
  constructor(args) {

    this.id = "";
    this.user = args["user"];
    this.identificationType = args["identificationType"];
    this.terrain = args["terrain"];

    this.dateStart = args["dateStart"];

    this.dateEnd = new Date(args["dateStart"].toLocaleDateString());
    this.dateEnd.setFullYear(this.dateEnd.getFullYear() + 3);

    this.dateMin = new Date(args["dateStart"].toLocaleDateString());
    this.dateMin.setMonth(this.dateMin.getMonth() + 6);

    this.price = args["price"];
    this.text = args["text"];

    this.getTextContract();

  }

  getTitle(){

    let title =
    this.dateStart.getFullYear() + "-" +
    this.dateStart.getMonth() + "-" +
    this.dateStart.getDate() + " " +
    this.user.getFullName() + " " +
    this.terrain.getTitle();

    return title;

    //"30-05-2016 Yendry Artavia Peña 9K-4"
  }

  getTextContract(){

      //this.text = this.text.replace(/\${fullName}/g, 'casa');
      //this.text = this.text.replace(new RegExp('Molino', 'gi'), 'Heredia');

      this.text = this.text.replace(new RegExp('\\${fullNameUpperCase}', 'gi'), this.user.getFullName().toUpperCase());
      this.text = this.text.replace(new RegExp('\\${fullName}', 'gi'), this.user.getFullName());
      this.text = this.text.replace(new RegExp('\\${identificationType\}', 'gi'), this.identificationType);
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

      //console.log(this.text);
  }

  convertDateToWords(ObjDate){

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
