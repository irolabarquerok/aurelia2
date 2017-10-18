
export class UserView {

  constructor(args) {
    this.title = "Vista contrato";
    this.listOfUsers = [];
  }

  created() {
     this.fetchContracts()
     .then(listOfUsers => {

       let data = [];
       for(var user in listOfUsers){
          data.push(listOfUsers[user]);
       }
       this.listOfUsers = data;
     });
   }

  fetchContracts(){
    return new Promise(function(resolve, reject){
        firebase.database().ref('users/').once('value')
        .then(function(data) {
            let listOfUsers = data.val();
            resolve(listOfUsers);
        });
    });

  }


}
