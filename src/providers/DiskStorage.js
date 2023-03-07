const fs = require("fs")
const path = require("path")
const { tempFolder, uploadsFolder } = require("../configs/upload")

class DiskStorage {
  async saveFile(file){
    await fs.promises.rename(
      path.resolve(tempFolder, file),
      path.resolve(uploadsFolder, file)
    )

    return file
  }

  async deleteFile(file){
    const filePath = path.resolve(uploadsFolder, file)
    
    try {
      await fs.promises.stat(filePath)
    } catch {
      return
    }

    await fs.promises.unlink(filePath)
  }
}

module.exports = DiskStorage