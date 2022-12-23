const sqliteConnection = require("../../sqlite")
const createUsers = require("./createUsers")

//function para rodar migrations
//"join('')" para corrigir possiveis espaçoes vazios entre a junção das migrations
async function migrationsRun() {
  const schemas = [
    createUsers
  ].join('');

  sqliteConnection()
  .then(db => db.exec(schemas))
  .catch(error => console.error(error));
}

module.exports = migrationsRun;