const { verify } = require("jsonwebtoken")
const authConfig = require("../configs/auth")
const AppError = require("../utils/AppError")

function ensureAuthentication(request, response, next) {
  const authHeader = request.headers.authorization
  if(!authHeader) {
    throw new AppError("JWT Token not informed", 401)
  }

  const [, token] = authHeader.split(" ")
  try {
    const {sub: user_id} = verify(token, authConfig.jwt.secret)
    request.user = {
      id: Number(user_id)
    }
    return next()

  } catch {
    throw new AppError("Ivalid JWT Token", 401)
  }
}

module.exports = ensureAuthentication
