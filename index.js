// Express ускоряет и упрощает разработку веб-приложений по сравнению с использованием только стандартного модуля http в Node.js
// Меньше кода для создания серверов и API, готовые решения для типичных задач
// Встроенная поддержка шаблонизаторов для генерации HTML
import express from 'express'
import { fileURLToPath } from "url";
import chalk from "chalk";
import path from "path";
import { addNote } from './notes-controller.js';

const port = 3030;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const basePath = path.join(__dirname, "pages");

const app = express()
// use используется для подключения middleware-функций к приложению Express
app.use(express.urlencoded({
    // используется библиотека qs, которая позволяет парсить более сложные вложенные объекты и структуры
    extended: true
}))

app.get('/', (req, res) => {
    res.sendFile(path.join(basePath, "index.html"))
})

app.post('/', async (req, res) => {
    await addNote(req.body.title)
    res.sendFile(path.join(basePath, "index.html"))
})

// Номер порта для прослушивания (параметр listen)
app.listen(port, () => {
    console.log(chalk.green(`Server is ready on ${port}`));
});
