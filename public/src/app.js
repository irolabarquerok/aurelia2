export class App {

  configureRouter(config, router){
    config.title = 'Contacts';
    config.map([
      { route: ['', 'contracts'],      moduleId: 'pages/contract-view/contract-view',   title: 'Contratos'},
      { route: 'contract/add',  moduleId: 'pages/contract-add/contract-add', title: 'Crear contrato'},
      { route: 'contract/preview/:terrainId/:contractId',  moduleId: 'pages/contract-preview/contract-preview', title: 'Vista contrato', name:'contract-preview'},

      { route: 'users',  moduleId: 'pages/user-view/user-view', title: 'Inquilinos'},
      { route: 'user/add',  moduleId: 'pages/user-add/user-add', title: 'Agregar inquilinos'},
      { route: 'user/:id',  moduleId: 'pages/user-detail/user-detail', title: 'Agregar inquilinos'},
      { route: 'user/edit/:id',  moduleId: 'pages/user-edit/user-edit', title: 'Agregar inquilinos'}
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
