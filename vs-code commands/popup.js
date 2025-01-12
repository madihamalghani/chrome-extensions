document.addEventListener("DOMContentLoaded", () => {
    const commandsContainer = document.getElementById("commands-container");
    const searchInput = document.getElementById("search");

    // Fetch and display commands
    fetch("commands.json")
        .then((response) => response.json())
        .then((data) => {
            renderCommands(data);

            // Search functionality
            searchInput.addEventListener("input", () => {
                const query = searchInput.value.toLowerCase();
                const filteredData = data.map((category) => ({
                    ...category,
                    commands: category.commands.filter((command) =>
                        command.name.toLowerCase().includes(query)
                    ),
                }));
                renderCommands(filteredData);
            });
        });

    function renderCommands(data) {
        commandsContainer.innerHTML = "";
        data.forEach((category) => {
            if (category.commands.length > 0) {
                const categoryDiv = document.createElement("div");
                categoryDiv.classList.add("command-category");
                categoryDiv.textContent = category.category;
                commandsContainer.appendChild(categoryDiv);

                category.commands.forEach((command) => {
                    const commandDiv = document.createElement("div");
                    commandDiv.classList.add("command-item");

                    const text = document.createElement("span");
                    text.textContent = `${command.name} (${command.shortcut}): ${command.description}`;

                    const copyBtn = document.createElement("button");
                    copyBtn.textContent = "Copy";
                    copyBtn.classList.add("copy-btn");
                    copyBtn.addEventListener("click", () => {
                        navigator.clipboard.writeText(command.shortcut);
                        alert("Copied to clipboard: " + command.shortcut);
                    });

                    commandDiv.appendChild(text);
                    commandDiv.appendChild(copyBtn);
                    commandsContainer.appendChild(commandDiv);
                });
            }
        });
    }
});
