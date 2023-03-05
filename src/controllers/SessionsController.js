const AppError = require("../utils/AppError")
const knex = require("../database/knex");

class SessionsController {
  async create(request, response){
    const { email, password } = request.body

    const user = await knex("users").where({ email }).first()

    if (!user) {
      throw new AppError("Invalid email or password")
    }

    return response.json({ user })
  }
}

module.exports = SessionsController