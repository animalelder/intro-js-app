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

return {
    add: add,
    getAll: getAll
}
})();

// Add new Pokemon to pokemonList
pokemonRepository.add({
    name: 'Ivysaur', height: 3.25, type:['Grass', 'Poison']
});

// Test to see if 'typeof' within 'add()' will ignore any input that is not an object
pokemonRepository.add('Pikachu');

// Print all Pokemon data into console as a test.
// Pikachu is not listed, typeof safeguard in IIFE is working
console.log(pokemonRepository.getAll());

// forEach function to print every Pokemon with 3 data fields
// Pokemon with a height greater than 4 will add comment 'Wow, that's big!'

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


// **** OLD CODE BELOW, WILL BE DELETED SOON ****
// PREVIOUS CODE

// For loop to list Pokemon from array into index.html
// for (let i = 0; i < pokemonList.length; i++) {
//     if (pokemonList[i].height > 3) {
//         document.write('<p>' + pokemonList[i].name + ' (Height: ');
//         document.write(pokemonList[i].height + ')');
//         document.write(' - Wow, that\'s big!' + '</p>')
//     }
//     else {
//         document.write('<p>' + pokemonList[i].name + ' (Height: ');
//         document.write(pokemonList[i].height + ')' + '</p>');
//     }
// }

// NEW CODE
// Refactor previous code to use forEach() rather than for loop

// First create the function passed to forEach()
// function pokeLoopFunction(pokemon) {
//     if (pokemon.height > 3) {
//         document.write('<p>' + pokemon.name + ' (Height: ');
//         document.write(pokemon.height + ')');
//         document.write(' - Wow, that\'s big!' + '</p>')
//     }
//     else {
//         document.write('<p>' + pokemon.name + ' (Height: ');
//         document.write(pokemon.height + ')' + '</p>');
//     }
// }

// Call pokeLoopFunction for each Pokemon
// pokemonList.forEach(pokeLoopFunction);
