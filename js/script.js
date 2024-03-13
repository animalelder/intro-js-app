/* Using an array, three random Pokemon will be added to an array called pokemonList
    Each Pokemon will be an object with 3 key-value pairs of data items:
        Name stored as a string
        Height stored as a float
        Types stored as an array of strings with at least one value */

// Create an array called pokemonList to store Pokemon data
var pokemonList = [];


// IIFE for pokemonList storage with add and getAll functions
// All the functions inside the IIFE can be called from outside the IIFE
// but they are sort of protected in there, separated, and have only a few global var
let pokemonRepository = (function(){
    // Create pokemonList object and variable for apiURL
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    function add(pokemon){
      if (
          typeof pokemon === "object" &&
          "name" in pokemon && "detailsUrl" in pokemon
        ) {
          pokemonList.push(pokemon);
        } else {
          console.log("pokemon is not correct");
        }     
  }
      // This function will get all the Pokemon, is called below outside IIFE
    function getAll(){
      return pokemonList;
    }

    // This has been changed to use jQuery to create elements styled with Bootstrap
    // Similar to getAll(), this will add elements for each Pokemon from our list to our page
    function addListItem(pokemon){
      pokemonRepository.loadDetails(pokemon).then(function () {
             // The row is in the index
             let $row = $('.row');

             // Create a div for one Pokemon shown as a card with a small image, title, and button to see details
             let $card = $('<div class="col-4 col-md-3 pb-1 border border-light"></div>');
             let $image = $('<img class="poke-img mx-auto" alt="sprite image"/>');
             // This is url from the JSON, small enough to look good on a card
             $image.attr("src", pokemon.imageUrlCard);

             let $cardBody = $('<div class="card-body"></div>')

             let $cardTitle = $('<h4 class="text-center" >' + pokemon.name + '</h4>');
             let $seeDetails = $('<button type="button" class="btn btn-primary mb-1 align-self-end float-right" data-toggle="modal" data-target="#myModal">More</button>');
             // Now we append the card into the div
             $row.append($card);
             // Now we add the individual info to the card
             $card.append($cardTitle);
             $card.append($cardBody);
             $cardBody.append($image);
             $cardBody.append($seeDetails);
     
             $seeDetails.on("click", function (event) {
               showDetails(pokemon);
             });
      });
    }

    // Show details per pokemon
    function showDetails(pokemon){
    loadDetails(pokemon).then( function (){
    openModal(pokemon);
        })
        }

    // This will load the list of 150 pokemon via the api
    function loadList() {
      return fetch(apiUrl).then(function (response) {
        return response.json();
      }).then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url
          };
          add(pokemon);
          console.log(pokemon);
        });
      }).catch(function (e) {  
        console.error(e);
      })
    }
    
    // Load the details per Pokemon
    function loadDetails(item) {

      let url = item.detailsUrl;
      return fetch(url).then(function (response) {
      return response.json();
      }).then(function (details) {
        // Getting the details of a pokemon: imgUrl for index and modal, height, and types
        item.imageUrlCard = details.sprites.front_shiny;
        item.imageUrlModal = details.sprites.other.dream_world.front_default;
        item.height = details.height;
        // Create an array for multiple types
        item.types = [];
        // Loop through the types data to find the name in type
        // Add type names to item.types array
        for (let i = 0; i < details.types.length; i++){
        item.types.push(details.types[i].type.name);
        };
      }).catch(function (e) {
          console.error(e);
      });
    }

    function openModal(pokemon){
      let modalBody = $('.modal-body');
      let modalTitle = $('.modal-title');
      let modalHeader = $('.modal-header');

      // Clear the content of the title and body of the modal
      modalTitle.empty();
      modalBody.empty();

      // element for the name
      let nameElement = $("<h2>" + pokemon.name + "</h2>");
      // image content
      let imageElementModal = $('<img class="modal-img" style="max-width:25%">');
      imageElementModal.attr("src", pokemon.imageUrlModal);
      // height element
      let heightElement = $("<p> Height: " + pokemon.height + "</p>");
      // type information
      let typeElement = $("<p>Type: " + pokemon.types.join(", ") + "</p>"); 

      // Add the elements created with json data
      modalTitle.append(nameElement);
      modalBody.append(imageElementModal);
      modalBody.append(heightElement);
      modalBody.append(typeElement);
    }

    // Every IIFE must return the functions inside at the end
    return {
      add: add,
      getAll: getAll,
      addListItem: addListItem,
      loadList: loadList,
      loadDetails: loadDetails,
      openModal: openModal,
    };
})();

pokemonRepository.loadList().then(function() {
    // Now the data is loaded!
    pokemonRepository.getAll().forEach(function(pokemon){
      pokemonRepository.addListItem(pokemon);
    });
  });


    
    