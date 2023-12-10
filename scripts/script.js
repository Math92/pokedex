document.getElementById('searchButton').addEventListener('click', searchPokemon)

let urlBase = 'https://pokeapi.co/api/v2/pokemon/'
let resultContainer = document.getElementById('results')

function searchPokemon() {
    resultContainer.innerHTML = 'Buscando Pokemon...'
    let searchInput = document.getElementById('searchInput').value.trim().toLowerCase()

    if (searchInput === '') {
        resultContainer.innerHTML = 'No se ha ingresado un nombre de Pokémon. Intente nuevamente.'
        return
    }

    fetch(`${urlBase}${searchInput}`)
        .then(response => response.json())
        .then(response => displayPokemon(response))
        .catch(error => {
            resultContainer.innerHTML = 'No se ha encontrado el Pokémon. Intente nuevamente.'
        })
}

function displayPokemon(response) {
    resultContainer.innerHTML = '';

    const divPokemon = document.getElementById('results');
    divPokemon.innerHTML = '';

    const sprites = response.sprites;
    const types = response.types;
    const abilities = response.abilities; // Nuevas habilidades
    const stats = response.stats;
    const height = response.height;
    const weight = response.weight;
    const id = response.id;
    const heldItems = response.held_items;

    if (sprites) {
        // Recorre todas las propiedades de sprites
        for (const prop in sprites) {
            if (typeof sprites[prop] === 'string') {
                const imgPokemon = document.createElement('img');
                imgPokemon.src = sprites[prop];
                resultContainer.appendChild(imgPokemon);
            } else if (prop === 'other') {
                // Si la propiedad es 'other', recorre las imágenes dentro de 'other'
                const otherSprites = sprites.other;
                for (const otherProp in otherSprites) {
                    if (typeof otherSprites[otherProp] === 'object' && otherSprites[otherProp].front_default) {
                        const imgOtherPokemon = document.createElement('img');
                        imgOtherPokemon.src = otherSprites[otherProp].front_default;
                        resultContainer.appendChild(imgOtherPokemon);
                    }
                }
            }
        }

        if (id) {
            const idHeading = document.createElement('h4');
            idHeading.textContent = 'ID del Pokemon:' + id;
            resultContainer.appendChild(idHeading);
        }

        // Agrega un h4 para los Tipos del Pokemon
        if (types && types.length > 0) {
            const typesHeading = document.createElement('h4');
            typesHeading.textContent = 'Tipos del Pokemon: ';

            const typesList = document.createElement('ul');
            types.forEach(typeInfo => {
                const typeItem = document.createElement('li');
                typeItem.textContent = typeInfo.type.name;
                typesList.appendChild(typeItem);
            });

            typesHeading.appendChild(typesList);
            resultContainer.appendChild(typesHeading);
        }

        // Agrega un h4 para las Habilidades del Pokemon
        if (abilities && abilities.length > 0) {
            const abilitiesHeading = document.createElement('h4');
            abilitiesHeading.textContent = 'Habilidades del Pokemon: ';
            resultContainer.appendChild(abilitiesHeading);

            const abilitiesList = document.createElement('ul');
            abilities.forEach(ability => {
                const abilityItem = document.createElement('li');
                abilityItem.textContent = ability.ability.name;
                abilitiesList.appendChild(abilityItem);
            });

            resultContainer.appendChild(abilitiesList);
        }

        // Agrega un h4 para las estadísticas del Pokemon
        if (stats && stats.length > 0) {
            const statsHeading = document.createElement('h4');
            statsHeading.textContent = 'Estadísticas del Pokemon: ';
            resultContainer.appendChild(statsHeading);

            const statsList = document.createElement('ul');
            stats.forEach(stat => {
                const statItem = document.createElement('li');
                statItem.textContent = `${stat.stat.name}: ${stat.base_stat}`;
                statsList.appendChild(statItem);
            });

            resultContainer.appendChild(statsList);
        }

        // Agrega un h4 para la altura del Pokemon
        if (height) {
            const heightHeading = document.createElement('h4');
            const heightInCm = height * 30.48; // Conversión a centímetros
            heightHeading.textContent = `Altura del Pokemon: ${heightInCm.toFixed(2)} cm`;
            resultContainer.appendChild(heightHeading);
        }

        // Agrega un h4 para el peso del Pokemon
        if (weight) {
            const weightHeading = document.createElement('h4');
            const weightInKg = weight * 0.4535923; // Conversión a kilogramos
            weightHeading.textContent = `Peso del Pokemon: ${weightInKg.toFixed(2)} kg`;
            resultContainer.appendChild(weightHeading);
        }

        if (resultContainer.children.length === 0) {
            resultContainer.innerHTML = 'No se encontraron imágenes para el Pokémon.';
        }
        // Agrega un h4 para los Artículos del Pokemon
        if (heldItems && heldItems.length > 0) {
            const heldItemsHeading = document.createElement('h4');
            heldItemsHeading.textContent = 'Artículos del Pokemon: ';
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
    } else {
        resultContainer.innerHTML = 'No se encontraron imágenes para el Pokémon.';
    }
}
