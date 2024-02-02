document.addEventListener('DOMContentLoaded', loadPokemonNames);
document.getElementById('searchButton').addEventListener('click', searchPokemon);

let urlBase = 'https://pokeapi.co/api/v2/pokemon/';
let resultContainer = document.getElementById('results');
let pokemonSelect = document.getElementById('pokemonSelect');


function loadPokemonNames() {
    pokemonSelect.innerHTML = '<option value="">Loading...</option>';

    let limit = 2000;
    fetch(`${urlBase}?limit=${limit}`)
        .then(response => response.json())
        .then(data => {
            // Ordena los resultados alfabéticamente por el nombre del Pokémon
            const sortedPokemon = data.results.sort((a, b) => a.name.localeCompare(b.name));

            pokemonSelect.innerHTML = '<option value="">Select a Pokemon</option>';
            sortedPokemon.forEach(pokemon => {
                const option = document.createElement('option');
                option.value = pokemon.name;
                option.textContent = pokemon.name;
                pokemonSelect.appendChild(option);
            });
        })
        .catch(error => {
            pokemonSelect.innerHTML = '<option value="">Error loading</option>';
            console.error('Error loading Pokemon names:', error);
        });
}




function searchPokemon() {
    resultContainer.innerHTML = 'Looking for Pokemon...';
    let selectedPokemon = pokemonSelect.value;

    if (selectedPokemon === '') {
        resultContainer.innerHTML = 'No Pokemon has been selected. Try again.';
        return;
    }

    fetch(`${urlBase}${selectedPokemon}`)
        .then(response => response.json())
        .then(response => displayPokemon(response))
        .catch(error => {
            resultContainer.innerHTML = 'No Pokemon has been selected. Try again.';
        });
}


function displayPokemon(response) {
    resultContainer.innerHTML = '';

    const frontDefault = response.sprites.front_default;
    const dreamWorld = response.sprites.other['dream_world'].front_default;

    const id = response.id;
    const types = response.types;
    const abilities = response.abilities;
    const stats = response.stats;
    const height = response.height;
    const weight = response.weight;
    const heldItems = response.held_items;

    // Función auxiliar para agregar imágenes
    const addImageToContainer = (imageUrl, altText) => {
        if (imageUrl) {
            const img = document.createElement('img');
            img.src = imageUrl;
            img.alt = altText;
            resultContainer.appendChild(img);
        }
    };

    // Muestra solo el front_default de la sección "showdown"
    const showdownFrontDefault = response.sprites.other['showdown'] ? response.sprites.other['showdown']['front_default'] : null;
    addImageToContainer(showdownFrontDefault, "Showdown Front Default");

    // Muestra la imagen frontal
    addImageToContainer(frontDefault, "Frontal");

    // Muestra la imagen de Dream World
    addImageToContainer(dreamWorld, "Dream World");



    // Muestra la ID del Pokémon
    if (id) {
        const idHeading = document.createElement('h4');
        idHeading.textContent = 'ID: ' + id;
        resultContainer.appendChild(idHeading);
    }

    // Muestra los tipos del Pokémon
    if (types && types.length > 0) {
        const typesHeading = document.createElement('h4');
        typesHeading.textContent = 'Types: ';

        const typesList = document.createElement('ul');
        types.forEach(typeInfo => {
            const typeItem = document.createElement('li');
            typeItem.textContent = typeInfo.type.name;
            typesList.appendChild(typeItem);
        });

        typesHeading.appendChild(typesList);
        resultContainer.appendChild(typesHeading);
    }

    // Muestra las habilidades del Pokémon
    if (abilities && abilities.length > 0) {
        const abilitiesHeading = document.createElement('h4');
        abilitiesHeading.textContent = 'Abilities: ';
        resultContainer.appendChild(abilitiesHeading);

        const abilitiesList = document.createElement('ul');
        abilities.forEach(ability => {
            const abilityItem = document.createElement('li');
            abilityItem.textContent = ability.ability.name;
            abilitiesList.appendChild(abilityItem);
        });

        resultContainer.appendChild(abilitiesList);
    }

    // Muestra las estadísticas del Pokémon
    if (stats && stats.length > 0) {
        const statsHeading = document.createElement('h4');
        statsHeading.textContent = 'Statistics: ';
        resultContainer.appendChild(statsHeading);

        const statsList = document.createElement('ul');
        stats.forEach(stat => {
            const statItem = document.createElement('li');
            statItem.textContent = `${stat.stat.name}: ${stat.base_stat}`;
            statsList.appendChild(statItem);
        });

        resultContainer.appendChild(statsList);
    }

    // Muestra la altura del Pokémon
    if (height) {
        const heightHeading = document.createElement('h4');
        const heightInCm = height * 10; // Conversión de decímetros a centímetros
        heightHeading.textContent = `Height: ${heightInCm} cm`;
        resultContainer.appendChild(heightHeading);
    }

    // Muestra el peso del Pokémon
    if (weight) {
        const weightHeading = document.createElement('h4');
        const weightInKg = weight / 10; // Conversión de hectogramos a kilogramos
        weightHeading.textContent = `Weight: ${weightInKg} kg`;
        resultContainer.appendChild(weightHeading);
    }

    // Muestra los artículos que lleva el Pokémon
    if (heldItems && heldItems.length > 0) {
        const heldItemsHeading = document.createElement('h4');
        heldItemsHeading.textContent = 'Articles: ';
        resultContainer.appendChild(heldItemsHeading);

        const heldItemsList = document.createElement('ul');
        heldItems.forEach(heldItem => {
            const heldItemName = heldItem.item.name;
            const heldItemListItem = document.createElement('li');
            heldItemListItem.textContent = heldItemName;
            heldItemsList.appendChild(heldItemListItem);
        });

        resultContainer.appendChild(heldItemsList);
    }

    // Verifica si se agregaron imágenes al contenedor
    if (resultContainer.children.length === 0) {
        resultContainer.innerHTML = 'No specific images were found for the Pokemon.';
    }
}


