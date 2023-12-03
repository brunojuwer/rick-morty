const URL = "https://rickandmortyapi.com/api/character"

const filterContainer = document.querySelector(".filter-container")

filter.addEventListener('focus', () => {
  filterContainer.classList.add('focused')
}) 

filter.addEventListener('blur', () => {
  filterContainer.classList.remove('focused')
}) 


// Fetch 
async function fetchCharactersByPage(page = 1){
  const response = await axios.get(`${URL}/?page=${page}`)
  const characters = response.data.results;

  console.log(characters);
}

fetchCharactersByPage()


// Filter characters by name

// async function getCharactersByName(name) {
//   return await axios.get(`${URL}/?name=${name}`)
// }

// filter.addEventListener('keyup', async e => {
//   (await getCharactersByName(e.target.value)).data.results
// }) 

