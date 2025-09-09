import path from 'path'
import {fileURLToPath} from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

console.log(path.dirname(__filename)) // директория файла
console.log(path.basename(__filename)) // название файла
console.log(path.extname(__filename)) // расширение файла
console.log(path.parse(__filename)) // находит определенный файл
console.log(path.join(__dirname, '..', './modules', './app.js')) // конкатенирует строчку
