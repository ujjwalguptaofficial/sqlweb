import * as peg from "pegjs";
import * as fs from "fs";

function getFileContent(path) {
    return fs.readFileSync(`./${path}`)
}