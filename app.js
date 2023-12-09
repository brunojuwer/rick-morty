const filterContainer = document.querySelector(".filter-container");
const charactersCountElement = document.querySelector("[data-count-characters]");
const locationsCountElement = document.querySelector("[data-count-locations]");
const episodesCountElement = document.querySelector("[data-count-episodes]");

const charactersURL = "https://rickandmortyapi.com/api/character";
const episodesURL = "https://rickandmortyapi.com/api/episode";
const locationsURL = "https://rickandmortyapi.com/api/location";

async function apiDataLoader(page = 1) {
  const characters = await axios.get(`${charactersURL}/?page=${page}`)
  const episodes = await axios.get(`${episodesURL}/?page=${page}`)
  const locations = await axios.get(`${locationsURL}/?page=${page}`)

  return {
    characters: characters.data,
    episodes: episodes.data,
    locations: locations.data
  }
}

filter.addEventListener('focus', () => {
  filterContainer.classList.add('focused');
}) 

filter.addEventListener('blur', () => {
  filterContainer.classList.remove('focused');
}) 

function mountCard(image, name, status, species, location, episode) {
  return `
  <article class="card">
  <img class="character-image" src="${image}" alt="Character image">
  <div class="character-info">
      <div>
          <h2>${name}</h2>
          <h3><span class="status ${status}"></span>${translateStatus(status)} - ${translateSpeciesName(species)}</h3>
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
  `;
}

async function fetchLastSeenEpisode(episodes) {
  return (await axios.get(episodes[episodes.length - 1]));
}

async function fetchCharactersByPage(page = 1){
  try {

    const response = await axios.get(`${charactersURL}/?page=${page}`);
    const characters = response.data.results;
    
    characters.forEach( async ({name, status, location, image, episode, species}) => {
      const episodeName = (await fetchLastSeenEpisode(episode)).data.name;
      container.innerHTML += mountCard(image, name, status, species, location, episodeName);
    });
  } catch(error) {
    alert("Não foi possível buscar personagens");
  }
}
fetchCharactersByPage();

async function getCharactersByName(name) {
  return await axios.get(`${charactersURL}/?name=${name}`);
}

filter.addEventListener('keyup', async e => {
  container.innerHTML = '<div class="loader"></div>';
  const filteredCharacters = (await getCharactersByName(e.target.value)).data.results;
// TODO: erro se não achou nome
  setTimeout(()=> {
    container.innerHTML = '';
    filteredCharacters.forEach( async ({name, status, location, image, episode, species}) => {
      const episodeName = (await fetchLastSeenEpisode(episode)).data.name;
      container.innerHTML += mountCard(image, name, status, species, location, episodeName);
    });
  }, 300);
}); 


//TODO: ajustar cards com muita informação

async function getDataCount(data) {
  const res = await apiDataLoader()
    return res[data].info.count;
}

async function printApiEnpointsInfoAmount() {
  charactersCountElement.textContent = await getDataCount('characters');
  locationsCountElement.textContent = await getDataCount('locations');
  episodesCountElement.textContent = await getDataCount('episodes');
}
printApiEnpointsInfoAmount()