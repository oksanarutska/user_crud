import {AppBackend} from './appBackend.js';
import {TableUsers} from './table_users.js';

(async function () {
    const backend = new AppBackend();
    const users = await backend.get();

    console.log(users);
    const newTableUser = new TableUsers(users);
    const newUser = await newTableUser.render();
})();