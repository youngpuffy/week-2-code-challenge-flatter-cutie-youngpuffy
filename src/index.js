// Your code here
document.addEventListener("DOMContentLoaded", () => {
    const characterBar = document.getElementById("character-bar");
    const detailedInfo = document.getElementById("detailed-info");
    const characterName = document.getElementById("name");
    const characterImage = document.getElementById("image");
    const voteCount = document.getElementById("vote-count");
    const voteForm = document.getElementById("votes-form");
    const resetButton = document.getElementById("reset-btn");


    fetch("http://localhost:3000/characters")
        .then(response => response.json())
        .then(data => {
            data.forEach(character => {
                const span = document.createElement("span");
                span.textContent = character.name;
                span.addEventListener("click", () => displayCharacter(character));
                characterBar.appendChild(span);
            });
        });

    function displayCharacter(character) {
        characterName.textContent = character.name;
        characterImage.src = character.image;
        voteCount.textContent = character.votes;
        detailedInfo.dataset.id = character.id; // Store ID for voting
    }
    voteForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const votesToAdd = parseInt(event.target.votes.value);
        if (!isNaN(votesToAdd)) {
            voteCount.textContent = parseInt(voteCount.textContent) + votesToAdd;
        }
        event.target.reset();
    });

    
    resetButton.addEventListener("click", () => {
        voteCount.textContent = 0;
    });
});
document.getElementById("character-form").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const name = document.getElementById("name-input").value;
    const image = document.getElementById("image-url").value;
    const newCharacter = { name, image, votes: 0 };

    addCharacterToBar(newCharacter);

    event.target.reset();

    fetch("http://localhost:3000/characters", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCharacter)
    })
    .then(response => response.json())
    .then(data => console.log("Character added:", data));
});