const chalk = require("chalk").default;
const Note = require("./models/Note");

async function addNote(title, owner) {
    await Note.create({ title, owner });
    console.log(chalk.bgGreen("Note was added"));
}

async function getNotes() {
    const notes = await Note.find();
    return notes;
}

async function removeNote(id, owner) {
    await Note.deleteOne({ _id: id, owner });
    console.log(chalk.bgRed("Note removed"));
}

async function updateNote(noteData, owner) {
    const result = await Note.updateOne({ _id: noteData.id, owner }, { title: noteData.title })

    if (result.matchedCount === 0) {
        throw new Error('No note to edit')
    }
    console.log(chalk.bgYellow(`Note with id='${noteData.id}' has been updated`));
}

module.exports = {
    addNote,
    getNotes,
    updateNote,
    removeNote,
};
