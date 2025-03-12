import React from 'react';
import { cardStyles } from '../styles/pokemonStyles';

const PokemonCard = ({ pokemon }) => {
  return (
    <div style={cardStyles.card}>
      <img 
        src={pokemon.image} 
        alt={pokemon.name}
        style={cardStyles.image}
      />
      <h3 style={cardStyles.title}>{pokemon.name}</h3>
      <p style={cardStyles.moves}>
        <span style={cardStyles.movesLabel}>Moves:</span><br />
        {pokemon.moves.join(", ")}
      </p>
    </div>
  );
};

export default PokemonCard; 