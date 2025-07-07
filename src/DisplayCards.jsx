import React from 'react';
import Grid from '@mui/material/Grid';
import PokeCard from './Card.jsx';

export default function DisplayCards({ cards = [], onCardClick }) {
  return (
    <Grid container spacing={1}>
      {cards.map((pokemon, idx) => (
        <Grid key={idx}>
          <div onClick={() => onCardClick?.(pokemon)}>
            <PokeCard
              PokemonName={pokemon.name}
              PokemonType={pokemon.types.join('/')}
              PokemonSpriteURL={pokemon.sprite}
              TypeBackground={pokemon.types[0]}
            />
          </div>
        </Grid>
      ))}
    </Grid>
  );
}
