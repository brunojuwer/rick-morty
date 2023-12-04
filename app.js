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
          <h3>${episode}</h3>
      </div>
  </div>
</article>
  `
}

async function fetchLastSeenEpisode(episodes) {
  return (await axios.get(episodes[episodes.length - 1]));
}

// Fetch 
async function fetchCharactersByPage(page = 1){
  try {

    const response = await axios.get(`${URL}/?page=${page}`)
    const characters = response.data.results;
    // trtar erros
    characters.forEach( async ({name, status, location, image, episode, species}) => {
      const episodeName = (await fetchLastSeenEpisode(episode)).data.name;
      container.innerHTML += mountCard(image, name, status, species, location, episodeName)
    });
  } catch(error) {
    alert("Não foi possível buscar personagens")
  }
}
fetchCharactersByPage()

// Filter characters by name
async function getCharactersByName(name) {
  return await axios.get(`${URL}/?name=${name}`);
}

filter.addEventListener('keyup', async e => {
  container.innerHTML = '<div class="loader"></div>';
  const filteredCharacters = (await getCharactersByName(e.target.value)).data.results

  setTimeout(()=> {
    container.innerHTML = '';
    filteredCharacters.forEach( async ({name, status, location, image, episode, species}) => {
      const episodeName = (await fetchLastSeenEpisode(episode)).data.name;
      container.innerHTML += mountCard(image, name, status, species, location, episodeName)
    });
  }, 300)
}); 