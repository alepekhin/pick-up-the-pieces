import Knex from 'knex'
import knexConfig from '../knexConfig'

const db = process.env.DB ? process.env.DB : 'mysql'
const schema = db === 'mysql' ? 'demo' : '' // sqlite does not have schema

const knex = Knex(knexConfig[db] as Knex.Config)

export const createTables = async () => {

  let hasTable = await knex.schema.withSchema(schema).hasTable('locations')
  if (!hasTable) {
    await knex.schema.withSchema(schema).createTable('locations', (table) => {
      table.string('location')
    })
  }

  hasTable = await knex.schema.withSchema(schema).hasTable('devices')
  if (!hasTable) {
    await knex.schema.withSchema(schema).createTable('devices', (table) => {
      table.string('device')
    })
  }

  hasTable = await knex.schema.withSchema(schema).hasTable('associations')
  if (!hasTable) {
    await knex.schema.withSchema(schema).createTable('associations', (table) => {
      table.string('device')
      table.string('location')
    })
  }

}

export default knex
