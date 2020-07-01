'use-strict'

const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const { DataSource } = require('apollo-datasource');

class db extends DataSource {

    constructor(url, db_name, collection) {
        super();
        this.url = url;
        this.db_name = db_name;
        this.collection = collection;
    }

    async connect() {
        this.client = new MongoClient(this.url, { useNewUrlParser: true, useUnifiedTopology: true });
        await this.client.connect();
        this.db = this.client.db(this.db_name);
        console.log("mongodb connected");
        return this.db;
    }

    async disconnect() {
        await this.client.close();
        console.log("connect closed");
    }

    async getAllClients() {
        var cursor = await this.db.collection(this.collection).find();
        return await cursor.toArray();
    }

    async getClient(id) {
        if (typeof id === 'string') {
            id = new ObjectId(id);
        }
        return await this.db.collection(this.collection).findOne({_id: id});
    }

    async getClientByEmail(email) {
        return await this.db.collection(this.collection).findOne({email: email});
    }

    async createClient(clientInput) {
        const rec = await this.getClientByEmail(clientInput.email);
        if ( rec != null) {
            return new SaveClientResponse(false, `email duplicated ${clientInput.email}`, null);    
        }
        await this.db.collection(this.collection).insertOne(clientInput);
        const client =  await this.getClient(result.insertedId);
        return new SaveClientResponse(true, "client added successfuly", client);
    }

    async updateClient(email, updateInput) {
        await this.db.collection(this.collection).updateOne({ email: email }, { $set: updateInput });
        const client =  await this.getClientByEmail(email);
        return new SaveClientResponse(true, "client updated successfuly", client);
    }

    async deleteClient(email) {
        let rec = await this.getClientByEmail(email);
        await this.db.collection(this.collection).deleteOne({ email: email });
        return new SaveClientResponse(true, "client deleted", rec);
    }

}

class SaveClientResponse {

    constructor(success, message, client) {
        this.success = success;
        this.message = message;
        this.client = client;
    }
}

module.exports = db;


