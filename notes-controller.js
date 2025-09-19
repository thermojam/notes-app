const chalk = require("chalk").default;
const Note = require("./models/Note");

async function addNote(title) {
    await Note.create({ title });
    console.log(chalk.bgGreen("Note was added"));
}

async function getNotes() {
    const notes = await Note.find();
    return notes;
}

async function updateNote(noteData) {
    await Note.updateOne({ _id: noteData.id }, { title: noteData.title })
    console.log(chalk.bgYellow(`Note with id='${noteData.id}' has been updated`));
}

async function removeNote(id) {
    await Note.deleteOne({ _id: id });
    console.log(chalk.bgRed("Note removed"));
}

module.exports = {
    addNote,
    getNotes,
    updateNote,
    removeNote,
};
