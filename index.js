// Модуль http позволяет создавать HTTP-серверы и клиентские запросы. Основное применение — создание веб-серверов.
import http, { createServer } from 'http';
import chalk from 'chalk';

// Запускает сервер на указанном порту
const port = 3030;

// Создаёт HTTP-сервер с обработчиком запросов
const server = http.createServer((req, res) => {

    // Завершает ответ и отправляет данные клиенту
    res.end('Hello from server!!!')
})

// Номер порта для прослушивания (параметр listen)
server.listen(port, () => {
    console.log(chalk.green(`Server is ready on ${port}`))
})
