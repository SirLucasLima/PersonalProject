const AppError = require("../utils/AppError")
const knex = require("../database/knex");
const { compare } = require("bcryptjs");

class SessionsController {
  async create(request, response){
    const { email, password } = request.body

    const user = await knex("users").where({ email }).first()
    if (!user) {
      throw new AppError("Invalid email or password", 401)
    }

    const passwordValidation = await compare(password, user.password)
    if(!passwordValidation) {
      throw new AppError("Invalid email or password", 401)
    }

    return response.json({ user })
  }
}

module.exports = SessionsController