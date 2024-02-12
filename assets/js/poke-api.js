const pokerApi = {}

/** Filtrando somente os dados que preciso da Api do Pokemon,
 * e passando para uma class para criar um pokemon com somente o que preciso.
 *
 * @param {Array} pokeDetail Detalhes do pokemon que vem pela Api.
 * @returns Classe com os detalhes do pokemon.
 */
function convertPokeApiDetailToPokemon(pokeDetail) {
  const pokemon = new Pokemon()
  pokemon.number = pokeDetail.id.toString().padStart(3, '0')
  pokemon.name = pokeDetail.name

  const types = pokeDetail.types.map(typeSlot => typeSlot.type.name)
  const [type] = types

  pokemon.types = types
  pokemon.type = type
  pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

  return pokemon
}

pokerApi.getPokemonsDetail = pokemon => {
  return fetch(pokemon.url)
    .then(jsonUrlPokemons => jsonUrlPokemons.json())
    .then(convertPokeApiDetailToPokemon)
    .catch(erro =>
      console.log(
        'Erro em pegar o detalhes dos pokemons da lista de urls.\n',
        erro
      )
    )
}

pokerApi.getPokemons = ({ offset = 0, limit = 0 }) => {
  const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`
  return fetch(url)
    .then(resp => resp.json())
    .then(jsonBody => jsonBody.results)
    .then(pokemons => pokemons.map(pokerApi.getPokemonsDetail))
    .then(detailRequests => Promise.all(detailRequests))
    .then(pokemonsDatails => pokemonsDatails)
    .catch(erro => console.log(erro))
}
