const sqliteConnection = require("../database/sqlite")
const AppError = require("../utils/AppError");

class UsersController {
  async create(request, response) {
    const { name, email, password } = request.body;
    
    //conexão com db é assincrona
    const database = await sqliteConnection();

    //email check
    const checkUserExists = await database.get("SELECT * FROM users WHERE email = (?)", [email])
    if(checkUserExists){
      throw new AppError("This e-mail is not available.")
    }
    return response.status(201).json();
  }
}

module.exports = UsersController;