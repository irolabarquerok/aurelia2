import {Contract} from '../../lib/class/contract';

export class ContractPreview {

	constructor(args) {
		this.title = "Vista contrato";
		this.contract = null;
	}

	activate(params, routeConfig) {
		this.fetchContract(params.terrainId + "/" + params.contractId)
		.then(contract => {

			contract.data = true;
			let ObjContract = new Contract(contract);
		 	this.contract = ObjContract;

		});

	}



	fetchContract(id){
		return new Promise(function(resolve, reject){
		   firebase.database().ref('contracts/' + id).once('value')
		   .then(function(data) {
			 let contract = data.val();
			 resolve(contract);
		 });
		});
	}

}
