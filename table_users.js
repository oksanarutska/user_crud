import {AppBackend} from './appBackend.js';

export class TableUsers {

    constructor(users) {
        this.users = users;
        this.page = 0;
        this.pageSize = 10;
        this.search = '';
        this.appBackend = new AppBackend();

        document.addEventListener('click', (e) => {
            if (e.target.matches('.delete_button')) {
                const userId = e.target.dataset.id;
                this.deleteUser(userId);
            }

        });

        document.getElementById("count_users").addEventListener("change", (event) => {
            this.pageSize = event.target.value;
            this.render();
        });


        document.getElementById("users_search").addEventListener("keyup", (event) => {
            // 13 - 'enter' key
            if (event.which === 13) {
                this.search = event.target.value;
                this.render();
            }
        });

        [...document.getElementsByClassName('button_previous')].forEach(
            btn => {
                btn.onclick = this.prevPage.bind(this);
            });
        [...document.getElementsByClassName('button_next')].forEach(
            btn => {
                btn.onclick = this.nextPage.bind(this);
            });
    }


    deleteUser(userId) {
        this.appBackend.delete(userId)
            .then(_ => {
                this.users = this.users.filter(u => u.id !== userId);
                this.render();
            });
    }


    prevPage() {
        this.page--;
        this.render();
    }

    nextPage() {
        this.page++;
        this.render();
    }

    getUsers() {
        let filteredUsers = this.users.slice();

        filteredUsers = filteredUsers.filter(u => {
            return u.name.toLowerCase().indexOf(this.search.toLowerCase()) >= 0;
        });
        filteredUsers = filteredUsers.slice(this.page * this.pageSize, (this.page + 1) * this.pageSize);


        return filteredUsers;
    }

    render() {
        document.getElementById('table_base').innerHTML = `
         <table class="table table-dark table_size">
  <thead>
    <tr>
      <th scope="col">Id</th>
      <th scope="col">Name</th>
      <th scope="col">Data</th>
      <th scope="col">Email</th>
    </tr>
  </thead>
  <tbody>
  <tr>
  <form id="form">
  <td><input class="id" type="number"></td>
  <td><input class="name" type="text"></td>
  <td><input class="data" type="number"></td>
  <td><input class='email' type="email"></td>
  <td><button class="btn btn-success" id="add_button" >Add</button></td>
  </form> 
</tr>
    ${this.getUsersMarkup()}
    
  </tbody>
</table> `;

        const toCount = (this.page + 1) * this.pageSize;
        const isLastPage = this.users.length < toCount;

        document.getElementById("paging-info").innerText = `Showing ${this.page * this.pageSize + 1} to ${(isLastPage ? this.users.length : toCount)} of ${this.users.length} entries`;

        document.getElementById('add_button').addEventListener('click', (add) => {
            var user = {
                name: document.querySelector('.name').value,
                email: document.querySelector('.email').value,
            };
            this.appBackend.create(user)
                .then(async (response) => {
                    const addedUser = await response.json();
                    this.users.push(addedUser);
                    this.render();
                });


        });

    }

    getUsersMarkup() {
        return this.getUsers().map((user) => {
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