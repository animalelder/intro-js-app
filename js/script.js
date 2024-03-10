/* Using an array, three random Pokemon will be added to an array called pokemonList
    Each Pokemon will be an object with 3 key-value pairs of data items:
        Name stored as a string
        Height stored as a float
        Types stored as an array of strings with at least one value */

// Create an array called pokemonList to store Pokemon data
var pokemonList = [];

// IIFE for pokemonList storage with add and getAll functions
let pokemonRepository = (function(){

    let pokemonList = [
        { name: 'Kakuna', height: 2.0, type: ['Bug', 'Poison']},
        { name: 'Charizard', height: 5.6, type: ['Fire', 'Flying']},
        { name: 'Tentacool', height: 3.92, type: ['Water', 'Poison']},
    ];

    function add(pokemon){
        if (typeof pokemon === 'object'){
        pokemonList.push(pokemon);
        }
    }

    function getAll(){
        return pokemonList;
    }

    function addListItem(pokemon){
        let container = document.querySelector('.pokemon-list');
        let listItem = document.createElement('li');
        let button = document.createElement('button')
        button.innerText = pokemon.name;
        button.classList.add('pokemon-item');
        listItem.appendChild(button);
        container.appendChild(listItem);
        addButtonListener(button, pokemon);
    }

    function addButtonListener(button, pokemon){
        button.addEventListener('click', function() {showDetails(pokemon)});
    }

    function showDetails(pokemon){
        console.log('Name: ' + pokemon.name + ' & Height: ' + pokemon.height)
    }

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        showDetails: showDetails,
        addButtonListener: addButtonListener
    }
})();

// Add new Pokemon to pokemonList
pokemonRepository.add({
    name: 'Ivysaur', height: 3.25, type:['Grass', 'Poison']
});


// forEach function to call addListItem to create elements for each Pokemon
pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
});




/* 
    THIS IS OLD CODE BELOW HERE, I WILL DELETE IT NEXT TIME

    Code Moved into IIFE
pokemonRepository.getAll().forEach(function(pokemon){
    let container = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    let button = document.createElement('button')
    button.innerText = pokemon.name;
    button.classList.add('pokemon-item');
    listItem.appendChild(button);
    container.appendChild(listItem);
})
*/

/* VERY OLD CODE
pokemonRepository.getAll().forEach(function(pokemon){
    if (pokemon.height > 4) {
        document.write('<p>' + pokemon.name + ' (Height: ');
        document.write(pokemon.height + ')');
        document.write(' - Wow, that\'s big!' + '</p>')
    }
    else {
        document.write('<p>' + pokemon.name + ' (Height: ');
        document.write(pokemon.height + ')' + '</p>');
    }
})
*/

// Test to see if 'typeof' within 'add()' will ignore any input that is not an object
// pokemonRepository.add('Pikachu');

// Print all Pokemon data into console as a test.
// Pikachu is not listed, typeof safeguard in IIFE is working
// console.log(pokemonRepository.getAll());