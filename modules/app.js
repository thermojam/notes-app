// обязательно наличие расширения при импорте без сборщиков!!
// import {Playground} from "./playground.js";
// console.log(Playground.NUM)


// современный вариант импортов и спользования глобалных объектов __dirname & __filename
import path from 'path'
import {fileURLToPath} from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

console.log(__dirname)
console.log(__filename)
