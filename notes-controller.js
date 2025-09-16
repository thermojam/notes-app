import { readFile, writeFile } from "fs/promises";
import chalk from "chalk";

const DB_PATH = "./db.json";

async function loadNotes() {
    const data = await readFile(DB_PATH, "utf-8");
    return JSON.parse(data).notes || [];
}

async function saveNotes(notes) {
    const data = { notes };
    await writeFile(DB_PATH, JSON.stringify(data, null, 2));
}

export async function addNote(title) {
    const notes = await loadNotes();
    const note = { id: Date.now().toString(), title };
    notes.push(note);
    await saveNotes(notes);
    console.log(chalk.green(`Note "${title}" added`));
}

export async function getNotes() {
    return await loadNotes();
}

export async function updateNote(id, newTitle) {
    const notes = await loadNotes();
    const idx = notes.findIndex((n) => n.id === id);
    if (idx !== -1) {
        notes[idx].title = newTitle;
        await saveNotes(notes);
        console.log(chalk.blue(`Note ${id} updated to "${newTitle}"`));
    }
}

export async function removeNote(id) {
    const notes = await loadNotes();
    const filtered = notes.filter((n) => n.id !== id);
    await saveNotes(filtered);
    console.log(chalk.red(`Note ${id} removed`));
}
