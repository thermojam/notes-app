document.addEventListener("click", async (event) => {
    const btn = event.target.closest("button[data-type]");
    if (!btn) return;

    const type = btn.dataset.type;
    const id = btn.dataset.id;
    const li = btn.closest("li");

    if (type === "remove") {
        await fetch(`/${id}`, { method: "DELETE" });
        li.remove();
    }

    if (type === "edit") {
        const span = li.querySelector(".note-title");
        const oldTitle = span.textContent.trim();
        const newTitle = prompt("Введите новое название:", oldTitle);

        if (newTitle === null) return;
        if (!newTitle.trim()) return alert("Название не может быть пустым");

        await fetch(`/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title: newTitle.trim() }),
        });

        span.textContent = newTitle.trim();
    }
});
