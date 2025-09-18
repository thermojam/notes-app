const fs = require("fs/promises");
const path = require("path");
const chalk = require("chalk").default;

const notesPath = path.join(__dirname, "db.json");

async function addNote(title) {
    const notes = await getNotes();
    const note = {
        title,
        id: Date.now().toString(),
    };

    notes.push(note);

    await saveNotes(notes);
    console.log(chalk.bgGreen("Note added"));
}

async function getNotes() {
    const notes = await fs.readFile(notesPath, { encoding: "utf-8" });
    return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [];
}

async function saveNotes(notes) {
    await fs.writeFile(notesPath, JSON.stringify(notes));
}

async function editNote(id, newTitle) {
    const notes = await getNotes();
    const editingNoteIdx = notes.findIndex((note) => note.id === id);

    notes[editingNoteIdx].title = newTitle;

    await saveNotes(notes);
    console.log(chalk.bgYellow("Note updated"));
}

async function printNotes() {
    const notes = await getNotes();

    console.log(chalk.bgBlue("Here is the list of notes:"));
    notes.forEach((note) => {
        console.log(chalk.bgWhite(note.id), chalk.blue(note.title));
    });
}

async function removeNote(noteId) {
    const notes = await getNotes();
    const newNotes = notes.filter(({ id }) => id !== noteId);

    if (notes.length === newNotes.length) {
        console.log(chalk.white(`Note with id: "${noteId}" was not found`));
        return;
    }

    await saveNotes(newNotes);
    console.log(chalk.bgRed("Note removed"));
}

module.exports = {
    addNote,
    getNotes,
    editNote,
    printNotes,
    removeNote,
};
