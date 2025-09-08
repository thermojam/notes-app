import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { addNote, getNotes, removeNote } from "./notes-controller.js";
import chalk from "chalk";

yargs(hideBin(process.argv))
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
        async handler({ title }) {
            await addNote(title);
        },
    })

    .command({
        command: "list",
        describe: "Print all notes",
        async handler() {
            const notes = await getNotes();
            if (notes.length === 0) {
                console.log(chalk.red("No notes found"));
            } else {
                console.log(chalk.blueBright.bold("All notes:"));
                notes.forEach((n, i) => {
                    console.log(
                        chalk.magenta(`#${i + 1}`),
                        chalk.green(`(${n.id})`),
                        chalk.white.bold(n.title)
                    );
                });
            }
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
            await removeNote(id);
        },
    })

    .parse();
