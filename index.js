// Модуль http позволяет создавать HTTP-серверы и клиентские запросы. Основное применение — создание веб-серверов.
import { createServer } from "http";
import chalk from "chalk";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

// Запускает сервер на указанном порту
const port = 3030;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const basePath = path.join(__dirname, "pages");

// Создаёт HTTP-сервер с обработчиком запросов
const server = createServer(async (req, res) => {
    try {
        if (
            req.method === "GET" &&
            (req.url === "/" || req.url === "/index.html")
        ) {
            const content = await fs.readFile(
                path.join(basePath, "index.html"),
                "utf8"
            );
            res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
            return res.end(content);
        }

        // другой путь или метод
        res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
        return res.end("Not Found");
    } catch (err) {
        console.error(chalk.red("Ошибка при обработке запроса:"), err);
        res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
        return res.end("Internal Server Error");
    }
});

// Номер порта для прослушивания (параметр listen)
server.listen(port, () => {
    console.log(chalk.green(`Server is ready on ${port}`));
});
