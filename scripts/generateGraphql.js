const fs = require("fs");
const dateFns = require("date-fns");
const {exit} = require("process");

const userInput = process.argv[2];
const projectName = toPascal(userInput);
const regex = /{[a-zA-Z]+}/gm;
const inputDir = './input'
const inputFileContent = {}
const outputFileContent = {}

const inputFiles = getInputFiles(inputDir)

for (let i = 0; i < inputFiles.length; i++) {
    const itemKeys = getFileNames(inputDir)
    inputFileContent[itemKeys[i]] = getEntityFile(inputFiles[i])
    outputFileContent[itemKeys[i]] = inputFileContent[itemKeys[i]].replace(regex, projectName)
    const date = dateFns.format(new Date, 'yyyy_MM_dd')
    const filename = `./__mock__/output/Special${projectName}${itemKeys[i]}_${date}.graphql`;
    writeFile(filename, outputFileContent[itemKeys[i]])
}

function getEntityFile(filePath) {
    try {
        return fs.readFileSync(filePath, "utf8");
    } catch (err) {
        console.error(err);
    }
}

function getInputFiles(path) {
    try {
        const fileNames = getFileNames(path)
        return getFullPaths(fileNames, path)
    } catch (err) {
        console.error(err)
    }
}

function getFileNames(path) {
    return fs.readdirSync(path)
}

function getFullPaths(array, path) {
    const paths = []
    array.map((item) => {
        const fullPath = path + '/' + item
        paths.push(fullPath)
    })
    return paths
}


function writeFile(path, content) {
    let directory = path.match(/.+[a-zA-z]+\//gm)[0]
    try {
        if (!fs.existsSync(directory)) fs.mkdirSync(directory, { recursive: true })
        fs.writeFileSync(path, content);
    } catch (err) {
        console.log(err)
    }
}

function  toPascal(value){
    const words = value.split(/[\s\-_]+/gm)
    const capitalized = words.map(word => capitalize(word))
    return capitalized.join('')
}

function capitalize(value) {
    return value.charAt(0).toUpperCase() + value.slice(1);
}


