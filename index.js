const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const { addNote, printNotes, removeNote } = require("./notes-controller");

const argv = yargs(hideBin(process.argv))
    .command({
        command: "add",
        describe: "Add new note to list",
        builder: {
            title: {
                type: "string",
                describe: "Note title",
                demandOption: true,
            },
        },
        handler({ title }) {
            addNote(title);
        },
    })
    .command({
        command: "list",
        describe: "Print all notes",
        async handler() {
            printNotes();
        },
    })
    .command({
        command: "remove",
        describe: "Remove note by id",
        builder: {
            id: {
                type: "string",
                describe: "Note id",
                demandOption: true,
            },
        },
        async handler({ id }) {
            removeNote(id);
        },
    })
    .parse();
