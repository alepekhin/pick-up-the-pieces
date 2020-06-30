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

    async getAllClients() {
        var cursor = await this.db.collection(this.collection).find();
        return await cursor.toArray();
    }

    async createClient(newClient) {
        const result = await this.client.db().collection(this.collection).insertOne(newClient);
        return result.insertedId;
    }

    async updateClient(email, clientInput) {
        const result = await this.client.db().collection(this.collection).updateOne({ email: email }, { $set: clientInput });
        return result.modifiedCount;
    }

    async deleteClient(email) {
        const result = await this.client.db().collection(this.collection).deleteOne({ email: email });
        return result.deletedCount;
    }


}

module.exports = db;


