
import {User} from '../../lib/class/user';
import {Terrain} from '../../lib/class/terrain';
import {Contract} from '../../lib/class/contract';

import mammoth from 'mammoth';
import {HttpClient} from 'aurelia-fetch-client';
let httpClient = new HttpClient();

import {TerrainsAPI} from '../../lib/data/terrains-api';
import {inject} from 'aurelia-framework';

@inject(TerrainsAPI)

export class ContractAdd {

    constructor(TerrainsAPI) {

        //APIS

        this.api = TerrainsAPI;

        //OBJECTS

        this.terrains = [];
        this.terrain = null;

        //BINDS

        //user
        this.identification = "";

        this.firstNameOne = "";
        this.firstNameTwo = "";
        this.lastNameOne = "";
        this.lastNameTwo = "";

        this.phone = "";
        this.email = "";

        //apartment
        this.terrainId = "";
        this.number = "";

        //contract
        this.identificationType = "Cédula";
        this.date = null;
        this.dateOptions = {
          closeOnSelect: true,
          closeOnClear: false,
          selectYears: 50,
          selectMonths: true
        };

        this.price = null;

    }

    created() {
        this.api.getTerrainList().then(terrains => {
            this.terrains = terrains;
            if(this.terrains.length > 0){
                this.terrain = this.terrains[0];
                this.terrainId = this.terrain.id;

                if(this.terrain.type === 'Apartments'){
                    this.api.getTerrainDetails(this.terrainId)
                    .then(terrain => {
                      this.terrain = terrain;
                    });
                }
            }
        });
    }

	onChangeTerrain(){
		  this.api.getTerrainDetails(this.terrainId)
		  .then(terrain => {
		    this.terrain = terrain;
		    this.selectAparmentNumber.refresh();
		  });
	}

     //data

    onSave(){

        //obtiene el nombre del documento a buscar ej: "apartment-10k-2"
        let name = this.terrain.name.replace(' ','-');
	    let urlDocument = 'http://localhost/aurelia-contract/public/src/assets/documents/' + name + '.docx';

        //obtiene el documento
        httpClient.fetch(urlDocument)
        .then(response => response.arrayBuffer())
        .then(arrayBuffer => mammoth.convertToHtml({
            arrayBuffer: arrayBuffer
        }))
        .then(data => this.createContract(data))
        .done(contract => {

            //obtiene los datos del contrato
            var dataContract = contract.getData();
            console.log(dataContract);

            //guarda el contrato en firebase
            firebase.database().ref('contracts/' + contract.getPath())
            .set(dataContract).
            then(() => {
                //guarda el usuario en firebase
                firebase.database().ref('users/' + contract.user.identification)
                .set(contract.user)
                .then(() =>{
                    //muestra la vista previa
                    window.location =  "/aurelia-contract/public/#/contract/preview/" +  contract.getPath();
                });
            });
        });

    }

    createContract(data){

        let user = new User({
            identification : this.identification,
            identificationType:this.identificationType,

            firstNameOne : this.firstNameOne,
            firstNameTwo: this.firstNameTwo,
            lastNameOne: this.lastNameOne,
            lastNameTwo: this.lastNameTwo,

            phone: this.phone,
            email : this.email
        });

        let terrain = new Terrain({
		    id : this.terrain.id,
		    name : this.terrain.name,
	        type : this.terrain.type,
        });

        if(this.terrain.type === "Apartments"){
            let apartment = this.terrain.apartments.filter(x => x.id == this.number)[0];
            terrain.nise = apartment.nise;
            terrain.number = this.number;
        }else{
            terrain.nise = this.terrain.nise;
        }

        let contract = new Contract({
            user:user,
            terrain:terrain,
            dateStart: this.date,
            price : this.price,
            text : data.value
        });

	  contract.getTextContract();

        return contract;

    }

}
