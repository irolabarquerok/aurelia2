
import {User} from '../../lib/class/user';
import {Terrain} from '../../lib/class/terrain';
import {Contract} from '../../lib/class/contract';

import mammoth from 'mammoth';
import {HttpClient} from 'aurelia-fetch-client';
let httpClient = new HttpClient();

import {TerrainsAPI} from '../../lib/data/terrains-api';
import {inject} from 'aurelia-framework';

@inject(TerrainsAPI)

export class ContractForm {

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

    onCreateContract(){


        let name = this.terrain.name.replace(' ','-');
	  let urlDocument = 'http://localhost/aurelia-contract/public/src/assets/documents/' + name + '.docx';

        httpClient.fetch(urlDocument)
        .then(response => response.arrayBuffer())
        .then(arrayBuffer => mammoth.convertToHtml({
            arrayBuffer: arrayBuffer
        }))
        .then(data => this.createContract(data))
        .done(contract => {
            //firebase.database().ref('contracts/' + contract.terrain.name + "/" + contract.getTitle()).set(contract);
            sessionStorage.contract = contract.text;
            window.location =  "/aurelia-contract/public/#/view";
        });

    }

    createContract(data){

        let user = new User({
            identification : this.identification,

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
            identificationType:this.identificationType,
            terrain:terrain,
            dateStart: new Date(this.date),
            price : this.price,
            text : data.value
        });

        return contract;

    }

}
