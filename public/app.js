document.addEventListener("click", (event) => {
    if (event.target.dataset.type === "remove") {
        const id = event.target.dataset.id;

        remove(id).then(() => {
            event.target.closest("li").remove();
        });
    }

    if (event.target.dataset.type === "edit") {
        const id = event.target.dataset.id;
        const editedTitleNode = event.target.closest("li").childNodes[0];
        const editedTitle = editedTitleNode.textContent.trim();
        const newTitle = prompt("Enter a new title:", editedTitle);

        if (!newTitle) {
            return;
        }

        edit(id, newTitle).then(() => {
            editedTitleNode.textContent = newTitle;
        });
    }
});

async function remove(id) {
    await fetch(`/${id}`, { method: "DELETE" });
}

async function edit(id, newTitle) {
    await fetch(`/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({ title: newTitle }),
    });
}
