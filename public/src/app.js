export class App {

  configureRouter(config, router){
    config.title = 'Contacts';
    config.map([
      { route: ['', 'create'],      moduleId: 'pages/contract-form/contract-form',   title: 'Crear contrato'},
      { route: 'view',  moduleId: 'pages/contract-view/contract-view', title: 'Vista contrato'}
    ]);

    this.router = router;
  }

  constructor() {
    this.title = "Creando contrato";
  }

  share(){
      alert("share");
  }

  print(){
      window.print();
  }

}
