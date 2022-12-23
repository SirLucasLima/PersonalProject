const { hash }= require("bcryptjs");
const sqliteConnection = require("../database/sqlite");
const AppError = require("../utils/AppError");

class UsersController {
  async create(request, response) {
    const { name, email, password } = request.body;
    
    //conexão com db é assíncrona
    const database = await sqliteConnection();

    //email check
    const checkUserExists = await database.get("SELECT * FROM users WHERE email = (?)", [email])
    if(checkUserExists){
      throw new AppError("This e-mail is not available.")
    }
    
    //
    const hashedPassword = hash(password, 8)

    //insert
    await database.run("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [name, email, password])

    //return ok
    return response.status(201).json();
  }
}

module.exports = UsersController;