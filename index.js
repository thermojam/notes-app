// Express ускоряет и упрощает разработку веб-приложений по сравнению с использованием только стандартного модуля http в Node.js
// Меньше кода для создания серверов и API, готовые решения для типичных задач
// Встроенная поддержка шаблонизаторов для генерации HTML
import express from 'express'
import chalk from "chalk";
import { addNote, getNotes } from './notes-controller.js';

const port = 3030;
const app = express();

// Позволяет задавать настройки, которые влияют на поведение Express-приложения
app.set('view engine', 'ejs');
app.set('views', 'pages');

// use используется для подключения middleware-функций к приложению Express
app.use(express.urlencoded({
    // используется библиотека qs, которая позволяет парсить более сложные вложенные объекты и структуры
    extended: true
}))

app.get('/', async (req, res) => {
    // Метод render используется для генерации HTML-кода на основе шаблона EJS и переданных данных
    res.render('index', {
        title: 'Express App',
        notes: await getNotes()
    })
})

app.post('/', async (req, res) => {
    await addNote(req.body.title)
    res.render('index', {
        title: 'Express App',
        notes: await getNotes()
    })
})

// Номер порта для прослушивания (параметр listen)
app.listen(port, () => {
    console.log(chalk.green(`Server is ready on ${port}`));
});
