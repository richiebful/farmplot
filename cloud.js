const fs = require("fs")

const ROOT_DIRECTORY = "./private/"

function initUserFolder(uid, callback) {
        const pathToFolder = ROOT_DIRECTORY + uid
        return new Promise((resolve, reject) => {
                fs.exists(CLOUD_ROOT + uid, (exists) => {
                        if (!exists) {
                                fs.mkdir(CLOUD_ROOT + uid, (err) => {
                                        if (err)
                                                reject()
                                        else
                                                resolve(err)
                                })
                        }
                        else {
                                reject(null)
                        }
                })
        })
}

function readFile(uid, filename) {
        const pathToFile = ROOT_DIRECTORY + uid + "/" + filename + ".json"
        return new Promise((resolve) => {
                fs.readFile(pathToFile, (err, contents) => {
                        if (err)
                                throw err
                        else
                                resolve(contents)
                })
        })
}

function createOrOverwriteFile(uid, filename, contents){
        const pathToFile = ROOT_DIRECTORY + uid + "/" + filename + ".json"
        return new Promise((resolve) => {
                fs.writeFile(pathToFile, contents, (err) => {
                        if (err) 
                                throw err
                        else
                                resolve()
                })
        })
}

function removeFile(uid, filename){
         const pathToFile = ROOT_DIRECTORY + uid + "/" + filename + ".json"
         return new Promise((resolve) => {
                 fs.unlink(pathToFile, (err) => {
                        if (err)
                                throw err
                        else
                                resolve()
                 })
         })
}

module.exports = {
        readFile,
        createOrOverwriteFile,
        removeFile,
        initUserFolder
}

