const { hash } = require("bcryptjs")
const AppError = require("../utils/AppError")
const sqliteConnection = require("../database/sqlite")

class UsersController {
  async create(request, response) {
    //--------- db connection ---------//
    const database = await sqliteConnection()
    
    //--------- create user ---------//
    const { name, email, password } = request.body

    const checkUserExists = await database.get("SELECT * FROM users WHERE email = (?)", [email])
    if(checkUserExists) {
      throw new AppError("This email is already in use")
    }

    const hashedPassword = await hash(password, 8) //encrypted password
    await database.run("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [name, email, hashedPassword])

    return response.status(201).json()
  }

  async update(request, response) {
    //--------- db connection ---------//
    const database = await sqliteConnection()
  
    //--------- create user ---------//
    const { name, email, password } = request.body
    const { id } = request.params

    const user = await database.get("SELECT * FROM users WHERE id = (?)", [id])
    if(!user) {
      throw new AppError("This user was not found")
    }

    const userWhitUpdatedEmail = await database.get("SELECT * FROM users WHERE email = (?)", [email])
    if(userWhitUpdatedEmail && userWhitUpdatedEmail.id !== user.id) {
      throw new AppError("This email is already in use")
    }

    user.name = name
    user.email = email

    await database.run(`
      UPDATE users SET
      name = ?,
      email = ?,
      updated_at = ?
      WHERE id = ?`
      [user.name, user.email, new Date(), id]
    )
    
    return response.status(200).json()
  }
}

module.exports = UsersController