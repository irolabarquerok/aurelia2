import mammoth from 'mammoth';
import {User} from '../../lib/class/user';
import {Contract} from '../../lib/class/contract';


export class ContractView {

  constructor(args) {

    this.title = "Vista contrato";
    this.contract = sessionStorage.contract;

    if (!this.contract) {
      window.location = "/aurelia2/public/#/create";
    }

  }

}
