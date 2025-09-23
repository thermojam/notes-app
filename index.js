require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser")
const chalk = require("chalk").default;
const path = require("path");
const {
    addNote,
    getNotes,
    removeNote,
    updateNote,
} = require("./notes-controller.js");
const { addUser, loginUser } = require('./users-controller');

const app = express();

app.set("view engine", "ejs");
app.set("views", "pages");

app.use(express.static(path.resolve(__dirname, "public")));
app.use(express.json());
// middleware (предварительная обработка) для express
app.use(cookieParser());
app.use(
    express.urlencoded({
        extended: true,
    })
);

app.get("/register", async (req, res) => {
    res.render("register", {
        title: "Express App",
        error: undefined,
    });
});

app.post("/register", async (req, res) => {
    try {
        await addUser(req.body.email, req.body.password);

        res.redirect('/login')
    } catch (e) {
        if (e.code === 11000) {
            res.render("register", {
                title: "Express App",
                error: 'Email is already registered'
            });
        }

        console.log('error', e)
        res.render("register", {
            title: "Express App",
            error: e.message,
        });
    }
});

app.get("/login", async (req, res) => {

    res.render("login", {
        title: "Express App",
        error: undefined,
    });
});

app.post("/login", async (req, res) => {
    try {
        const token = await loginUser(req.body.email, req.body.password);

        res.cookie('token', token);

        res.redirect('/');
    } catch (e) {
        res.render("login", {
            title: "Express App",
            error: e.message,
        });
    }
})

app.get("/", async (req, res) => {
    res.render("index", {
        title: "Express App",
        notes: await getNotes(),
        created: false,
        error: false,
    });
});

app.post("/", async (req, res) => {
    try {
        await addNote(req.body.title);
        res.render("index", {
            title: "Express App",
            notes: await getNotes(),
            created: true,
            error: false,
        });
    } catch(e) {
        console.log('Creation error', e)
        res.render("index", {
            title: "Express App",
            notes: await getNotes(),
            created: false,
            error: true,
        });
    }
});

app.put("/:id", async (req, res) => {
    await updateNote({ id: req.params.id, title: req.body.title });
    res.render("index", {
        title: "Express App",
        notes: await getNotes(),
        created: false,
        error: false,
    });
});

app.delete("/:id", async (req, res) => {
    await removeNote(req.params.id);
    res.render("index", {
        title: "Express App",
        notes: await getNotes(),
        created: false,
        error: false,
    });
});

// Mongoose делает работу с MongoDB в Node.js удобной, структурированной и безопасной
mongoose
    .connect(
        process.env.MONGODB_CONNECTION_STRING
    )
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(chalk.green(`Server is running on port ${process.env.PORT} ...`));
    });
});
