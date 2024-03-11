/* Using an array, three random Pokemon will be added to an array called pokemonList
    Each Pokemon will be an object with 3 key-value pairs of data items:
        Name stored as a string
        Height stored as a float
        Types stored as an array of strings with at least one value */

// Create an array called pokemonList to store Pokemon data
var pokemonList = [];

// IIFE for pokemonList storage with add and getAll functions
let pokemonRepository = (function(){

    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    function loadList() {
        showLoadingMessage();
        return fetch(apiUrl).then(function (response) {
          return response.json();
        }).then(function (json) {
            hideLoadingMessage();
          json.results.forEach(function (item) {
            let pokemon = {
              name: item.name,
              detailsUrl: item.url
            };
            add(pokemon);
            console.log(pokemon);
          });
        }).catch(function (e) {
          hideLoadingMessage();  
          console.error(e);
        })
      }

    function add(pokemon){
        if (
            typeof pokemon === "object" &&
            "name" in pokemon
          ) {
            pokemonList.push(pokemon);
          } else {
            console.log("pokemon is not correct");
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
    
    function loadDetails(item) {
        showLoadingMessage();
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
          return response.json();
        }).then(function (details) {
            hideLoadingMessage();
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
        }).catch(function (e) {
            hideLoadingMessage();
            console.error(e);
        });
      }
    
    function showDetails(pokemon){
        loadDetails(pokemon).then( function (){
        console.log(pokemon);
    })
    }


    return {
        loadList: loadList,
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadDetails: loadDetails,
        showDetails: showDetails,
        addButtonListener: addButtonListener
    }
})();

pokemonRepository.loadList().then(function() {
    // Now the data is loaded!
    pokemonRepository.getAll().forEach(function(pokemon){
      pokemonRepository.addListItem(pokemon);
    });
  });

function showLoadingMessage(){
    document.getElementById('loadingMessage').style.display = 'block';
    console.log('Loading.');
}

function hideLoadingMessage(){
    document.getElementById('loadingMessage').style.display = 'none';
    console.log('Finished Loading.')
}

// OLD CODE  
// forEach function to call addListItem to create elements for each Pokemon
//   pokemonRepository.getAll().forEach(function (pokemon) {
//       pokemonRepository.addListItem(pokemon);
//     });
    
    
    
    