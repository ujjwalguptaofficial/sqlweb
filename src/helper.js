exports.getFileContent = function (path) {
    return fs.readFileSync(`${path}`, {
        encoding: 'utf8'
    })
}

function saveAsFile(filePath, content) {
    fs.writeFileSync(filePath, content, {
        encoding: 'utf8'
    })
}

exports.createFolderIfNotExist = function (path) {
    if (!fs.existsSync(path)) {
        fs.mkdirSync(path);
    }
}