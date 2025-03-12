import React from 'react';
import PokemonCard from './PokemonCard';
import { listStyles } from '../styles/pokemonStyles';

const PokemonList = ({ pokemonList }) => {
  return (
    <div style={listStyles.container}>
      <h1 style={listStyles.title}>Pokémon List</h1>
      <div style={listStyles.grid}>
        {pokemonList.map((pokemon) => (
          <PokemonCard key={pokemon.name} pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
};

export default PokemonList; 