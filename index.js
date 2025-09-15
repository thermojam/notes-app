// Модуль http позволяет создавать HTTP-серверы и клиентские запросы. Основное применение — создание веб-серверов.
import { createServer } from "http";
import chalk from "chalk";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { addNote } from './notes-controller.js'


// Запускает сервер на указанном порту
const port = 3030;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const basePath = path.join(__dirname, "pages");

// Создаёт HTTP-сервер с обработчиком запросов
const server = createServer(async (req, res) => {
    if (req.method === "GET") {
        const content = await fs.readFile(path.join(basePath, "index.html"));
        res.writeHead(200, { "content-type": "text/html",})
        res.end(content);
        } else if (req.method === "POST") {
        const body = []
        res.writeHead(200, {
            'content-type': 'text/plain; charset=utf-8'
        })
        
        // Событие data позволяет обрабатывать данные по частям, не дожидаясь полной загрузки.
        req.on('data',  data => {
            body.push(Buffer.from(data))
            // Buffer — это класс в Node.js, который предназначен для работы с бинарными данными.
            // Он позволяет эффективно хранить и манипулировать двоичными данными, например, при работе с файлами, сетевыми потоками
        })

        req.on('end', () => {
           const title = body.toString().split('=')[1].replaceAll('+', ' ')
           addNote(title)
           res.end(`Title = ${title}`);
        })
    }
});

// Номер порта для прослушивания (параметр listen)
server.listen(port, () => {
    console.log(chalk.green(`Server is ready on ${port}`));
});
