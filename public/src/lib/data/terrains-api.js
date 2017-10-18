//latencia

let latency = 200;

//get id de los contratos

let id = 0;
function getId(){
  return ++id;
}

//get id de los apartamentos

let idAparmentNumber = 0
function getIdAparmentNumber(reset){
  if(reset == true){
    idAparmentNumber = 0;
  }
  return ++idAparmentNumber;
}

//contratos

let terrains = [
    {
      id:getId(),
      name:"Apartamentos 1K",
      type:"Apartments",
      apartments: [
        {
          id:getIdAparmentNumber(true),
          number:"1",
          nise:"171269"
        },
        {
          id:getIdAparmentNumber(),
          number:"2",
          nise:"166262"
        },
        {
          id:getIdAparmentNumber(),
          number:"3",
          nise:"170408"
        }
      ]
    },
    {
      id:getId(),
      name:"Apartamentos 2K",
      type:"Apartments",
      apartments: [
        {
          id:getIdAparmentNumber(true),
          number:"1",
          nise:"789391"
        },
        {
          id:getIdAparmentNumber(),
          number:"2",
          nise:"789390"
        },
        {
          id:getIdAparmentNumber(),
          number:"3",
          nise:"789389"
        },
        {
          id:getIdAparmentNumber(),
          number:"4",
          nise:"789388"
        },
        {
          id:getIdAparmentNumber(),
          number:"5",
          nise:"789387"
        },
        {
          id:getIdAparmentNumber(),
          number:"6",
          nise:"782696"
        }
      ]
    },
    {
      id:getId(),
      name:"Apartamentos 9K",
      type:"Apartments",
      apartments: [
        {
          id:getIdAparmentNumber(true),
          number:"1",
          nise:"174785"
        },
        {
          id:getIdAparmentNumber(),
          number:"2",
          nise:"520176"
        },
        {
          id:getIdAparmentNumber(),
          number:"3",
          nise:"570514"
        },
        {
          id:getIdAparmentNumber(),
          number:"4",
          nise:"516269"
        }
      ]
    },
    {
      id:getId(),
      name:"Apartamentos 19J",
      type:"Apartments",
      apartments: [
        {
          id:getIdAparmentNumber(true),
          number:"1",
          nise:"835270"
        }
      ]
    },
    {
      id:getId(),
      name:"Casa del Roble",
      type:"House",
      nise:"139339"
    },
    {
      id:getId(),
      name:"Casa Calle Vargas",
      type:"House",
      nise:"143997"
    },
    {
      id:getId(),
      name:"Casa 19J",
      type:"House",
      nise:"265182"
    }
];

export class TerrainsAPI {

  isRequesting = false;

  getTerrainList(){
    this.isRequesting = true;
    return new Promise(resolve => {
      setTimeout(() => {
        let results = terrains.map(x =>  { return {
          id:x.id,
          name:x.name,
          type:x.type
        }});
        resolve(results);
        this.isRequesting = false;
      }, latency);
    });
  }

  getTerrainDetails(id){
    this.isRequesting = true;
    return new Promise(resolve => {
      setTimeout(() => {
        let found = terrains.filter(x => x.id == id)[0];
        resolve(JSON.parse(JSON.stringify(found)));
        this.isRequesting = false;
      }, latency);
    });
  }

  getApartmentDetails(terrainId, number){
    this.isRequesting = true;
    return new Promise(resolve => {
      setTimeout(() => {
  	       let terrain = terrains.filter(x => x.id == terrainId)[0];
           let apartment = terrain.apartments.filter(x => x.id == number)[0];
  	       resolve(JSON.parse(JSON.stringify(apartment)));
  	        this.isRequesting = false;
      }, latency);
    });
  }

}
