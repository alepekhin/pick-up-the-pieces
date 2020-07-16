import Knex from 'knex'

const config = {
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    port: 3306,
    user: 'foo',
    password: 'bar',
    database: 'demo',
  },
}

const knex = Knex(config as Knex.Config)

export default knex
