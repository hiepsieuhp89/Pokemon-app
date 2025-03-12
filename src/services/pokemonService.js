import axios from 'axios';

const BASE_URL = "https://pokeapi.co/api/v2";
const POKEMON_LIMIT = 10;

// Create axios instance with base configuration
const pokeApi = axios.create({
  baseURL: BASE_URL,
  timeout: 5000, // Set timeout
});

// ✅ Correctly export isCancel function
export const isRequestCanceled = (error) => axios.isCancel(error);

// Batch fetch Pokemon data
export const fetchPokemonList = async (signal) => {
  try {
    const response = await pokeApi.get('/pokemon', {
      signal,
      params: {
        limit: POKEMON_LIMIT,
        offset: 0
      }
    });

    const pokemons = response.data.results.map(pokemon => ({
      name: pokemon.name,
      url: pokemon.url
    }));

    const detailsResponse = await Promise.all(
      pokemons.map(pokemon => 
        pokeApi.get(pokemon.url, { signal })
          .then(res => ({
            name: res.data.name,
            image: res.data.sprites.front_default,
            moves: res.data.moves.slice(0, 2).map(move => move.move.name)
          }))
          .catch(() => ({
            name: pokemon.name,
            image: 'https://via.placeholder.com/200?text=Error',
            moves: ['unknown']
          }))
      )
    );

    return detailsResponse;
  } catch (error) {
    throw error;
  }
};
