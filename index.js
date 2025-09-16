import express from "express";
import path from "path";
import chalk from "chalk";
import { fileURLToPath } from "url";
import {
    getNotes,
    addNote,
    removeNote,
    updateNote,
} from "./notes-controller.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3030;

app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "pages"));

app.use(express.static(path.resolve(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", async (req, res) => {
    res.render("index", {
        title: "Express App",
        notes: await getNotes(),
    });
});

app.post("/", async (req, res) => {
    await addNote(req.body.title);
    res.redirect("/");
});

app.put("/:id", async (req, res) => {
    const { title } = req.body;
    await updateNote(req.params.id, title);
    res.json({ success: true });
});

app.delete("/:id", async (req, res) => {
    await removeNote(req.params.id);
    res.json({ success: true });
});

app.listen(port, () => {
    console.log(chalk.green(`Server is running on http://localhost:${port}`));
});
