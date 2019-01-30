import {AppBackend} from './appBackend.js';
export class TableUsers {
    constructor(users) {
        this.users = users;
        const appBackend = new AppBackend();
        document.addEventListener('click', (e)=>{
           if (e.target .matches('.delete_button')){
               appBackend.delete(e.target.dataset.id)
           }
        });
    }

    render() {
        document.body.innerHTML = `
         <table class="table table-dark">
  <thead>
    <tr>
      <th scope="col">Id</th>
      <th scope="col">Name</th>
      <th scope="col">Data</th>
      <th scope="col">Email</th>
    </tr>
  </thead>
  <tbody>
    ${this.getUsersMarkup()}
  </tbody>
</table> `
    }

    getUsersMarkup() {
        return this.users.map((user) => {
            return `<tr>
                <td> ${user.id} </td>
                <td>${user.name} </td>
                <td> ${user.createdAt} </td>
                <td>${user.email} </td>
                <td><button class="delete_button btn btn-danger" data-id="${user.id}">Delete</button></td>
                </tr>
            `
        }).join('')
    }
}