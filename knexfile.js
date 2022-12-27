const path = require("path");

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      //usando path para resolver navegação em qualquer OS
      filename: path.resolve(__dirname, "src", "database", "database.db")
    },
    pool: {
      //funcionalidade para habilitar a deleção em cascata
      afterCreate: (conn, cb) => conn.run("PRAGMA foreing_keys = ON", cb)
    },
    migrations: {
      directory: path.resolve(__dirname, "src", "database", "knex", "migrations")
    },
    useNullAsDefault: true
  }
};


//comando para a criação das tabelas (npx knex migrate:make "createTags")
