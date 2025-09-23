require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose")
const chalk = require("chalk").default;
const path = require("path");
const {
    addNote,
    getNotes,
    removeNote,
    updateNote,
} = require("./notes-controller.js");

const port = 3030;
const app = express();

app.set("view engine", "ejs");
app.set("views", "pages");

app.use(express.static(path.resolve(__dirname, "public")));
app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(express.json());

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
        app.listen(port, () => {
            console.log(chalk.green(`Server is running on port ${port} ...`));
    });
});
