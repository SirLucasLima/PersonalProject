const { hash } = require("bcryptjs");
const sqliteConnection = require("../database/sqlite");
const AppError = require("../utils/AppError");

class UsersController {
  async create(request, response) {
    const { name, email, password } = request.body;
    
    //conexão com db é assíncrona
    const database = await sqliteConnection();
    //email check
    const checkUserExists = await database.get('SELECT * FROM users WHERE email = (?)', 
    [email])
    
    //se o emial esta sendo usando, erro será lançado
    if (checkUserExists) {
        throw new AppError("This e-mail is not available.");
    }
    
    //bcrypt no password
    const hashedPassword = await hash(password, 8)

    //insert
    await database.run("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", 
    [name, email, hashedPassword])

    //return ok
    return response.status(201).json();
  }
}

module.exports = UsersController;