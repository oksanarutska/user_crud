export class AppBackend {
    constructor() {
        this.baseUrl = 'https://5bf417c491c25b0013a3b9a2.mockapi.io'
    }

    get() {
        return fetch(`${this.baseUrl}/users`)
            .then(function (response) {
                return response.json();
            })
    }

    create(user) {
        return fetch('https://5bf417c491c25b0013a3b9a2.mockapi.io/users', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
    }

    delete(id) {
        return fetch(`https://5bf417c491c25b0013a3b9a2.mockapi.io/users/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
    }
}

// constructor(){
//     this.baseUrl='https://5bf417c491c25b0013a3b9a2.mockapi.io'
// }
// get({limit=10}) {
//     return fetch(`${this.baseUrl}/users?limit=${limit}`)
//         .then(function (response) {
//             return response.json();
//         })
// }

