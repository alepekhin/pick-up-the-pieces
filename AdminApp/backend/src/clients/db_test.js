'use-strict'

const crypto = require("crypto");
const mongodb = require('./db');
const url = 'mongodb://localhost:27017';
const db_name = 'oauth';
const collection = 'oauth_clients';

const db = new mongodb(url, db_name, collection);

async function insert() {
    const email = crypto.randomBytes(3 * 4).toString('base64') + '@xxx4.com';
    let newClient = {
        email: email,
        name: 'My random Client',
        roles: 'guest admin'

    };
    let insertedId = await db.createClient(newClient);
    console.log(insertedId);
}

async function update() {
    let newClient = {
        name: 'Updated 4-rd Client',
        roles: 'guest admin superuser'

    };
    let modifiedCount = await db.updateClient('xxx@xxx4.com', newClient);
    console.log(modifiedCount);
}

async function delete1() {
    let deletedCount = await db.deleteClient('xxx@xxx.com');
    console.log(deletedCount);
}

async function print() {
    let result = await db.getAllClients();
    console.log(result);
}

async function doit() {
    await db.connect();
    await insert();
    await update();
    await print();
    await db.disconnect();
}

doit();