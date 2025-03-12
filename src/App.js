import React, { useEffect, useState } from "react";
import PokemonList from './components/PokemonList';
import { fetchPokemonList, isRequestCanceled } from './services/pokemonService';
import { loadingStyles } from './styles/pokemonStyles';

const App = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const results = await fetchPokemonList(controller.signal);
        setPokemonList(results);
      } catch (err) {
        if (!isRequestCanceled(err)) {
          console.error("Error in fetchData:", err);
          setError(`Failed to fetch Pokémon data. Please try again.`);
        } else {
          console.log('Request cancelled:', err.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    
    return () => controller.abort();
  }, []);

  if (error) {
    return (
      <div style={loadingStyles.error}>
        <p>{error}</p>
        <button 
          onClick={() => window.location.reload()}
          style={{
            padding: '10px 20px',
            marginTop: '20px',
            cursor: 'pointer'
          }}
        >
          Try Again
        </button>
      </div>
    );
  }

  if (isLoading) {
    return <div style={loadingStyles.container}>Loading Pokémon...</div>;
  }

  return <PokemonList pokemonList={pokemonList} />;
};

export default App;
