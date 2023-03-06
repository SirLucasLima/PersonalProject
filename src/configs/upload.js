const multer = require("multer")
const path = require("path")
const crypto = require("crypto")

const tempFolder = path.resolve(__dirname, "..", "..", "temp")
const uploadsFolder = path.resolve(tempFolder, "uploads")

const multerConfig = {
  storage: multer.diskStorage({
    destination: tempFolder,
    filename(request, file, callback){
      const fileHash = crypto.randomBytes(10).toString("hex")
      const fileName = `${fileHash}-${file.originalname}`

      return callback(null, fileName)
    }
  })
}

module.exports = {
  tempFolder,
  uploadsFolder,
  multerConfig
}