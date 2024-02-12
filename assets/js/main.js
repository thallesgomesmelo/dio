const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const max_limit = 151
const limit = 10
let offset = 0

function loadPokemonItens({ offset, limit }) {
  pokerApi
    .getPokemons({ offset, limit })
    .then(
      (pokemons = []) =>
        (pokemonList.innerHTML += pokemons
          .map(pokemon => {
            return `
                  <li class="pokemon ${pokemon.type}">
                    <span class="number_pokemon">#${pokemon.number}</span>
                    <span class="name_pokemon">${pokemon.name}</span>
              
                    <div class="detail">
                      <ol class="types">
                        ${pokemon.types
                          .map(type => `<li class="type ${type} ">${type}</li>`)
                          .join('')}
                      </ol>
                      <img
                        src="${pokemon.photo}"
                        alt="${pokemon.name}"
                      />
                    </div>
                  </li>`
          })
          .join(''))
    )
    .catch(err => console.log(err))
}
/** Já inicializando site com valores. */
loadPokemonItens({ offset, limit })

loadMoreButton.addEventListener('click', () => {
  offset += limit
  const qtdRecordNexPage = offset + limit

  if (qtdRecordNexPage >= max_limit) {
    const newLimit = max_limit - offset
    loadPokemonItens({ offset, newLimit })

    loadMoreButton.parentElement.removeChild(loadMoreButton)
  } else {
    loadPokemonItens({ offset, limit })
  }
})
