
export class ContractView {

  constructor(args) {

    this.title = "Vista contrato";
    this.contract = sessionStorage.contract;

    if (!this.contract) {
      window.location = "/aurelia-contract/public/#/create";
    }

  }

}
