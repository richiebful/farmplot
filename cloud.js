const fs = require("fs")
const path = require("path")

const ROOT_DIRECTORY = path.join(__dirname, 'private')

function initUserFolder(uid, callback) {
        pathToFolder = path.join(ROOT_DIRECTORY, uid.toString())
        fs.mkdir(pathToFolder, callback)
}

function readFile(uid, filename, callback) {
        const pathToFile = path.join(ROOT_DIRECTORY, uid.toString(), filename)
        fs.readFile(pathToFile, callback)
}

function sendFile(res, uid, filename, callback){
        const pathToFile = path.join(ROOT_DIRECTORY, uid.toString(), filename)
        res.sendFile(pathToFile, callback)
}

function createOrOverwriteFile(uid, filename, contents, callback){
        const pathToFile = path.join(ROOT_DIRECTORY, uid.toString(), filename)
        fs.writeFile(pathToFile, contents, callback)
}

function removeFile(uid, filename, callback){
        const pathToFile = path.join(ROOT_DIRECTORY, uid.toString(), filename)
        fs.unlink(pathToFile, callback)
}

module.exports = {
        readFile,
        sendFile,
        createOrOverwriteFile,
        removeFile,
        initUserFolder
}

