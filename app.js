const form = document.getElementById("pokemon-form");
const pokemonName = document.getElementById("pokemon-name");
const pokemonInfo = document.getElementById("pokemon-info");
const pokemonText = document.createElement("p");
const pokemonImage = document.createElement("img");

const url = "https://pokeapi.co/api/v2/pokemon/";

form.addEventListener("submit", (event) => {
  
  event.preventDefault();
  const name = pokemonName.value.trim().toLowerCase();
  if (!name) {
    pokemonInfo.innerHTML = "";
    pokemonText.textContent = "Please enter a Pokémon name.";
    pokemonInfo.appendChild(pokemonText);
    
    return;
  } else {
    fetch(url + name)
      .then((response) => {
        if (!response.ok) {
          pokemonInfo.innerHTML = "";
          pokemonText.textContent = "Pokémon not found. Please check the name and try again.";
          pokemonInfo.appendChild(pokemonText);
          // lanza un error para que el catch lo maneje y no siga al otro then
          throw new Error("Pokemon not found");
        }
        return response.json();
      })
      .then((pokemon) => {
        pokemonInfo.innerHTML = "";

        pokemonText.textContent = `Name: ${pokemon.name}, Height: ${pokemon.height}, Weight: ${pokemon.weight}`;

        pokemonImage.src = pokemon.sprites.front_default;

        pokemonInfo.appendChild(pokemonText);
        pokemonInfo.appendChild(pokemonImage);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
});
