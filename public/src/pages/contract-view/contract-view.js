import {Contract} from '../../lib/class/contract';
export class ContractView {

  constructor(args) {
    this.title = "Vista contrato";
    this.listOfContracts = [];
  }

  created() {
    this.fetchContracts()
    .then(listOfContracts => {

      let data = [];
      for(var terrain in listOfContracts){
        for(var contract in listOfContracts[terrain]){
             listOfContracts[terrain][contract].data = true;
             let ObjContract = new Contract(listOfContracts[terrain][contract]);
            data.push(ObjContract);
        }
      }

      this.listOfContracts = data;
    });
  }

  fetchContracts(){
    return new Promise(function(resolve, reject){
        firebase.database().ref('contracts/').once('value')
        .then(function(data) {
            let listOfContacts = data.val();
            resolve(listOfContacts);
        });
    });

  }

  select(contract) {
    console.log(contract);
    contract.getTextContract()
    sessionStorage.contract = JSON.stringify(contract);
    return true;
  }

}
