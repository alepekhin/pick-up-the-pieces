'use-strict'

const MongoClient = require('mongodb').MongoClient;
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

    async getClients() {
        var cursor = await this.db.collection(this.collection).find();
        return await cursor.toArray();
    }

    async getClient(client_id) {
        return await this.db.collection(this.collection).findOne({client_id: client_id});
    }

    async createClient(clientInput) {
        const rec = await this.getClient(clientInput.client_id);
        if ( rec != null) {
            return new SaveClientResponse(false, `client_id duplicated ${clientInput.client_id}`, null);    
        }
        let result = await this.db.collection(this.collection).insertOne(clientInput);
        const client =  await this.getClient(result.insertedId);
        return new SaveClientResponse(true, "client added successfuly", client);
    }

    async updateClient(client_id, updateInput) {
        await this.db.collection(this.collection).updateOne({ client_id: client_id }, { $set: updateInput });
        const client =  await this.getClient(client_id);
        return new SaveClientResponse(true, "client updated successfuly", client);
    }

    async deleteClient(client_id) {
        let rec = await this.getClient(client_id);
        await this.db.collection(this.collection).deleteOne({ client_id: client_id });
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


