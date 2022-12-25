const { hash } = require("bcryptjs");
const sqliteConnection = require("../database/sqlite");
const AppError = require("../utils/AppError");

class UsersController {
  async create(request, response) {
    const { name, email, password } = request.body;
    
    //conexão assíncrona com db 
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

  async update(request, response) {
    const { name, email } = request.body;
    const { id } = request.params;

    //conexão assíncrona com db 
    const database = await sqliteConnection();
    const user = await database.get("SELECT * FROM users WHERE id = (?)", 
    [id]);

    //id nao encontrado
    if(!user) {
      throw new AppError("The user was not found.");
    }

    const userWithUpdatedEmail = await database.get("SELECT * FROM users WHERE email = (?)", [email]);
    //se o id encontrado através do email for diferente do id informado, então significa que o user está tentando usar um email de outro user
    if(userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id){
      throw new AppError("This e-mail is already in use.")
    }

    user.name = name
    user.email = email

    await database.run(`
    UPDATE users SET
    name = (?),
    email = (?),
    updated_at = (?)
    WHERE id = (?)`,
    [user.name, user.email, new Date(), id]
    );

    //status não precisa ser informado, pois o padrão informado será 200
    return response.status(200).json();
    
  }
}

module.exports = UsersController;