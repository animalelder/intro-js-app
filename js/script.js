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
  
    // Define modalContainer by #modal-container
    let modalContainer = document.querySelector('#modal-container');
    // Create pokemonList object and variable for apiURL
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

        // Load the details per Pokemon
        function loadDetails(item) {
          showLoadingMessage();
          let url = item.detailsUrl;
          return fetch(url).then(function (response) {
            return response.json();
          }).then(function (details) {
              hideLoadingMessage();
              item.imageUrl = details.sprites.front_shiny;
              item.height = details.height;
          }).catch(function (e) {
              hideLoadingMessage();
              console.error(e);
          });
        }
      
  
    
        // Show details per pokemon
      function showDetails(pokemon){
          loadDetails(pokemon).then( function (){
          openModal(pokemon);
      })
      }

    function closeModal(pokemon){
      modalContainer.classList.remove('is-visible');
    }

    function openModal(pokemon){
      // Clear modal
      modalContainer.innerHTML = '';

      // Create the modal elements
      let modal = document.createElement('div');
      modal.classList.add('modal');

      let modalContent = document.createElement('div');
      modalContent.classList.add('modal-content');

      let closeButton = document.createElement('span');
      closeButton.classList.add('modal-close');
      closeButton.style.cssFloat='right';
      closeButton.innerHTML = '&times;';
      closeButton.addEventListener('click', closeModal);

      let nameElement = document.createElement('h2');
      nameElement.innerText = pokemon.name;

      let heightElement = document.createElement('p');
      heightElement.innerText = 'Height: ' + pokemon.height;

      let imageElement = document.createElement('img');
      imageElement.src = pokemon.imageUrl;
      imageElement.alt = pokemon.name;

      // Append the elements to the content div
      modalContent.appendChild(closeButton);
      modalContent.appendChild(nameElement);
      modalContent.appendChild(heightElement);
      modalContent.appendChild(imageElement);

      // Append the content to the modal
      modal.appendChild(modalContent);

      modalContainer.appendChild(modal);

      modalContainer.classList.add('is-visible');

      modalContainer.addEventListener('click', (e) => {
        // This is trigger when clicking inside the modal
        // We only want to close if the user clicks directly on
        // the overlay
        let target = e.target;
        if (target === modalContainer) {
          closeModal();
        }
      })
    }
  
    // This will load the list of 150 pokemon via the api
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

    // This is to add one pokemon, it will be called in loadList() above  
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

    // This function will get all the Pokemon, is called below outside IIFE
    function getAll(){
        return pokemonList;
    }

    // Similar to getAll(), this will add elements for each Pokemon from our list to our page
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

    // This function will listen for clicks on the button created in addListItem() above
    function addButtonListener(button, pokemon){
        button.addEventListener('click', function() {showDetails(pokemon)});
    }
    


    // Every IIFE must return the functions inside at the end
    return {
        loadList: loadList,
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadDetails: loadDetails,
        showDetails: showDetails,
        addButtonListener: addButtonListener,
        openModal: openModal,
        closeModal: closeModal
    }
})();

pokemonRepository.loadList().then(function() {
    // Now the data is loaded!
    pokemonRepository.getAll().forEach(function(pokemon){
      pokemonRepository.addListItem(pokemon);
    });
  });

// This was the bonus task to add a loading message
// It came out looking amateur, but it works
function showLoadingMessage(){
    document.getElementById('loadingMessage').classList.add('is-visible');
    console.log('Loading.');
}

// Hide loading message when Loading is finished
// Right now, setTimeout delays the loading message from disappearing so quickly
function hideLoadingMessage(){
  setTimeout(function() {
    document.getElementById('loadingMessage').classList.remove('is-visible');
    console.log('Finished Loading.');
}, 1000)};

// Listen in the window for the Escape key to close the modal
window.addEventListener('keydown', (e) => {
  let modalContainer = document.querySelector('#modal-container');
  if (e.key === 'Escape' && modalContainer.classList.contains('is-visible'))
  {
    pokemonRepository.closeModal();
  }
});
    
    