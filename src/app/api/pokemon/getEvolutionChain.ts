'use server'


import { notFound } from 'next/navigation';
import { EvolutionChain } from './evolutionChain';

export async function getEvolutionChain(url: string) {
  
  const res = await fetch(`${url}`);
  
  if (!res.ok) {
    // Render the closest `error.js` Error Boundary
    throw new Error('Something went wrong while loading the Pokemon data!');
  }

  const data = await res.json();
  const pokemonData = data as EvolutionChain;
  if (!pokemonData) {
    notFound();
  }
  return pokemonData;
}
