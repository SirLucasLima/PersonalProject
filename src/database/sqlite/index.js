const sqlite3 = require("sqlite3") //version of the driver used 
const sqlite = require("sqlite") //used to establish connection with the db
const path = require("path")

//async function to verify and create db file
async function sqliteConnection(){
  const database = await sqlite.open({
    filename: path.resolve(__dirname, "..", "database.db"),
    driver: sqlite3.Database
  })

  return database
}

module.exports = sqliteConnection