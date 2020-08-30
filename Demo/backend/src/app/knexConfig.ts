const knexConfig = {

    sqlite3: {
        client: 'sqlite3',
        useNullAsDefault: true,
        connection: {
            filename: ":memory:"
        }
    },
    mysql: {
        client: 'mysql',
        connection: {
          host: '127.0.0.1',
          port: 3306,
          user: 'foo',
          password: 'bar',
          database: 'demo' 
        }     
    }

    // other configuration here...

}

export default knexConfig