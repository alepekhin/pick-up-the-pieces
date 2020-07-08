import { MongoClient } from 'mongodb';
import { DataSource } from 'apollo-datasource';
// execute npm run generate
// when graphql schema changed
import { ClientInput, UpdateInput, Client, SaveClientResponse } from '../generated/graphql';

export class Db {

    private client: MongoClient
    private db: any

    constructor(
         readonly url: string
        ,readonly dbName: string
        ,readonly collection:string
    ) {
        // super();
        this.client = new MongoClient(this.url, { useNewUrlParser: true, useUnifiedTopology: true });
    }

    async connect() {
        await this.client.connect();
        this.db = this.client.db(this.dbName);
        console.log("mongodb connected");
        return this.db;
    }

    async disconnect() {
        await this.client.close();
        console.log("connect closed");
    }

    async getClients() {
        const cursor = await this.db.collection(this.collection).find();
        return await cursor.toArray();
    }

    async getClient(clientID: string) {
        return await this.db.collection(this.collection).findOne({clientID});
    }

    async createClient(clientInput: ClientInput) {
        const rec = await this.getClient(clientInput.client_id);
        if ( rec != null) {
            return this.createClientResponse(false, `client_id duplicated ${clientInput.client_id}`, undefined);
        }
        const result = await this.db.collection(this.collection).insertOne(clientInput);
        const client =  await this.getClient(result.insertedId);
        return this.createClientResponse(true, "client added successfuly", client);
    }

    async updateClient(clientID: string, updateInput: UpdateInput) {
        await this.db.collection(this.collection).updateOne({ clientID }, { $set: updateInput });
        const client =  await this.getClient(clientID);
        return this.createClientResponse(true, "client updated successfuly", client);
    }

    async deleteClient(clientID: string) {
        const rec = await this.getClient(clientID);
        await this.db.collection(this.collection).deleteOne({ clientID });
        return this.createClientResponse(true, "client deleted", rec);
    }

    private createClientResponse (
            success: boolean
            ,message: string
            ,client?: Client
    ): SaveClientResponse {
        return {
            success
            ,message
            ,client
        }
    }

}
