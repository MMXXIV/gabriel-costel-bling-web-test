'use server'


import { notFound } from 'next/navigation';
import { Pokemon } from './pokemon';

export async function getPokemon(url?: string) {
  
  const res = await fetch(`${url}`);
  
  if (!res.ok) {
    // Render the closest `error.js` Error Boundary
    throw new Error('Something went wrong while loading the Pokemon info!');
  }

  const data = await res.json();
  const pokemonData = data as Pokemon;

  if (!pokemonData) {
    notFound();
  }
  return pokemonData;
}
