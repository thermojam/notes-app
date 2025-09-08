import { readFile, writeFile } from "fs/promises";
import chalk from "chalk";

const DB_PATH = "./db.json";

async function loadNotes() {
    try {
        const data = await readFile(DB_PATH, "utf-8");
        return JSON.parse(data).notes || [];
    } catch (error) {
        throw error;
    }
}

async function saveNotes(notes) {
    const data = { notes };
    await writeFile(DB_PATH, JSON.stringify(data, null, 2));
}

export async function addNote(title) {
    const notes = await loadNotes();

    const note = {
        id: Date.now().toString(),
        title,
    };

    notes.push(note);
    await saveNotes(notes);
    console.log(chalk.green.bold(`Note "${title}" added successfully!`));
}

export async function getNotes() {
    return await loadNotes();
}

export async function removeNote(id) {
    const notes = await loadNotes();
    const filtered = notes.filter((n) => n.id !== id);

    if (notes.length === filtered.length) {
        console.log(chalk.red(`No note found with id: ${id}`));
        return;
    }

    await saveNotes(filtered);
    console.log(chalk.yellow.bold(`Note with id ${id} removed`));
}
