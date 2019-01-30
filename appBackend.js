export class AppBackend {
    get() {
        return fetch(' https://5bf417c491c25b0013a3b9a2.mockapi.io/users')
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

    delete(id){
        return fetch(`https://5bf417c491c25b0013a3b9a2.mockapi.io/users/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
    }
}

