/* Using an array, three random Pokemon will be added to an array called pokemonList
    Each Pokemon will be an object with 3 key-value pairs of data items:
        Name stored as a string
        Height stored as an integer (rounded to whole number)
        Types stored as an array of strings with at least one value */

// Create an array called pokemonList to store Pokemon data
var pokemonList = [];


// Add entry to pokemonList for Kakuna
pokemonList[0] = {
    name: 'Kakuna',
    height: 2,
    types: ['bug', 'poison'],
};

// Add entry to pokemonList for Charizard
pokemonList[1] = {
    name: 'Charizard',
    height: 5,
    types: ['fire', 'flying'],
};

// Add entry to pokemonList for Tentacool
pokemonList[2] = {
    name: 'Tentacool',
    height: 3,
    types: ['water', 'poison'],
};

// For loop to list Pokemon from array into index.html
for (let i = 0; i < pokemonList.length; i++) {
    if (pokemonList[i].height > 3) {
        document.write('<p>' + pokemonList[i].name + ' (Height: ');
        document.write(pokemonList[i].height + ')');
        document.write(' - Wow, that\'s big!' + '</p>')
    }
    else {
        document.write('<p>' + pokemonList[i].name + ' (Height: ');
        document.write(pokemonList[i].height + ')' + '</p>');
    }
    
}