const URL = "https://rickandmortyapi.com/api/character"

const filterContainer = document.querySelector(".filter-container")

filter.addEventListener('focus', () => {
  filterContainer.classList.add('focused')
}) 

filter.addEventListener('blur', () => {
  filterContainer.classList.remove('focused')
}) 


function mountCard(image, name, status, species, location, episode) {
  return `
  <article class="card">
  <img class="character-image" src="${image}" alt="Character image">
  <div class="character-info">
      <div>
          <h2>${name}</h2>
          <h3><span class="status ${status}"></span>${status} - ${species}</h3>
      </div>
      <div>
          <p>Última localização conhecida:</p>
          <h3>${location.name}</h3>
      </div>
      <div>
          <p>Visto a última vez em:</p>
          <h3>${"episode"}</h3>
      </div>
  </div>
</article>
  `
}

// Fetch 
async function fetchCharactersByPage(page = 1){
  const response = await axios.get(`${URL}/?page=${page}`)
  const characters = response.data.results;
  // trtar erros
  characters.forEach(({name, status, location, image, episode, species}) => {
    container.innerHTML += mountCard(image, name, status, species, location, episode)
  });
}

fetchCharactersByPage()


// Filter characters by name

async function getCharactersByName(name) {
  return await axios.get(`${URL}/?name=${name}`);
}

filter.addEventListener('keyup', e => {
  container.innerHTML = ""
  getCharactersByName(e.target.value)
    .then(res => {
        res.data.results.forEach(({name, status, location, image, episode, species}) => {
          container.innerHTML += mountCard(image, name, status, species, location, episode)
        });
    });
  
}) 

