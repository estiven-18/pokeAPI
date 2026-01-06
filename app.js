const form = document.getElementById("pokemon-form");
const pokemonName = document.getElementById("pokemon-name");
const url = "https://pokeapi.co/api/v2/pokemon/";
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = pokemonName.value.trim().toLowerCase();
  if (!name) {
    console.log("Please enter a Pokémon name.");
    return;
  } else {
    fetch(url + name)
      .then((response) => {
        if (!response.ok) {
          console.log("pokémon not found");
        } else {
        return response.json();
        }   
      })
      .then((pokemon) => console.log(pokemon))

    console.log(`Searching for Pokémon: ${name}`);
  }
});
