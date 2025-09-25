require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const chalk = require("chalk").default;
const path = require("path");
const {
    addNote,
    getNotes,
    removeNote,
    updateNote,
} = require("./notes-controller");
const { addUser, loginUser } = require("./users-controller");
const auth = require("./middlewares/auth");

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

app.get("/login", async (req, res) => {
    res.render("login", {
        title: "Express App",
        error: undefined,
    });
});

app.post("/login", async (req, res) => {
    try {
        const token = await loginUser(req.body.email, req.body.password);

        const cookieOptions = {
            httpOnly: true,
            sameSite: "lax",
            maxAge: 30 * 24 * 60 * 60 * 1000,
        };

        res.cookie("token", token, cookieOptions);

        res.redirect("/");
    } catch (e) {
        res.render("login", {
            title: "Express App",
            error: e.message,
        });
    }
});

app.get("/register", async (req, res) => {
    res.render("register", {
        title: "Express App",
        error: undefined,
    });
});

app.post("/register", async (req, res) => {
    try {
        await addUser(req.body.email, req.body.password);

        res.redirect("/login");
    } catch (e) {
        if (e.code === 11000) {
            res.render("register", {
                title: "Express App",
                error: "Email is already registered",
            });
        }

        console.log("error", e);
        res.render("register", {
            title: "Express App",
            error: e.message,
        });
    }
});

app.get("/logout", (req, res) => {
    res.clearCookie("token");
    res.redirect("/login");
});

app.use(auth);

app.get("/", async (req, res) => {
    const created = req.query.created === "true";
    const error = req.query.error || false;
    res.render("index", {
        title: "Express App",
        notes: await getNotes(),
        userEmail: req.user.email,
        created,
        error,
    });
});

app.post("/", async (req, res) => {
    try {
        await addNote(req.body.title, req.user.email);
        res.redirect("/?created=true");
    } catch (e) {
        console.log("Creation error", e);
        res.redirect("/?error=true");
    }
});

app.put("/:id", async (req, res) => {
    try {
        await updateNote(
            { id: req.params.id, title: req.body.title },
            req.user.email
        );
        res.redirect("/");
    } catch (e) {
        res.redirect(`/?error=${encodeURIComponent(e.message)}`);
    }
});

app.delete("/:id", async (req, res) => {
    try {
        await removeNote(req.params.id, req.user.email);
        res.redirect("/");
    } catch (e) {
        res.redirect(`/?error=${encodeURIComponent(e.message)}`);
    }
});

// Mongoose делает работу с MongoDB в Node.js удобной, структурированной и безопасной
mongoose.connect(process.env.MONGODB_CONNECTION_STRING).then(() => {
    app.listen(process.env.PORT, () => {
        console.log(
            chalk.green(`Server is running on port ${process.env.PORT} ...`)
        );
    });
});
