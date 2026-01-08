const form = document.getElementById("pokemon-form");
const pokemonName = document.getElementById("pokemon-name");
const pokemonInfo = document.getElementById("pokemon-info");

const url = "https://pokeapi.co/api/v2/pokemon/";

form.addEventListener("submit", (event) => {
  
  event.preventDefault();
  const name = pokemonName.value.trim().toLowerCase();
  if (!name) {
    pokemonInfo.innerHTML = "";
    const errorText = document.createElement("p");
    errorText.textContent = "Please enter a Pokémon name.";
    pokemonInfo.appendChild(errorText);
    
    return;
  } else {
    fetch(url + name)
      .then((response) => {
        if (!response.ok) {
          pokemonInfo.innerHTML = "";
          const errorText = document.createElement("p");
          errorText.textContent = "Pokémon not found. Please check the name and try again.";
          pokemonInfo.appendChild(errorText);
          // lanza un error para que el catch lo maneje y no siga al otro then
          throw new Error("Pokemon not found");
        }
        return response.json();
      })
      .then((pokemon) => {
        pokemonInfo.innerHTML = "";

        const nameTitle = document.createElement("h2");
        nameTitle.className = "pokemon-name-title";
        nameTitle.textContent = pokemon.name;
        
        const contentContainer = document.createElement("div");
        contentContainer.className = "pokemon-content-container";
        
        const statsContainer = document.createElement("div");
        statsContainer.className = "pokemon-stats";
        
        const heightText = document.createElement("p");
        heightText.textContent = `Height: ${pokemon.height}`;
        
        const weightText = document.createElement("p");
        weightText.textContent = `Weight: ${pokemon.weight}`;
        
        const typeText = document.createElement("p");
        typeText.textContent = `Type: ${pokemon.types.map(t => t.type.name).join(", ")}`;


        const imageContainer = document.createElement("div");
        imageContainer.className = "pokemon-image-container";
        
        const pokemonImage = document.createElement("img");
        pokemonImage.src = pokemon.sprites.front_default;
        pokemonImage.alt = pokemon.name;
        
        imageContainer.appendChild(pokemonImage);
        
        statsContainer.appendChild(heightText);
        statsContainer.appendChild(weightText);
        statsContainer.appendChild(typeText);
        
        
        
        contentContainer.appendChild(imageContainer);
        contentContainer.appendChild(statsContainer);
        
        pokemonInfo.appendChild(nameTitle);
        pokemonInfo.appendChild(contentContainer);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
});
