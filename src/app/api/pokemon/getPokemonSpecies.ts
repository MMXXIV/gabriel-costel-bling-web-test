'use server'

import { notFound } from 'next/navigation';
import { API_URL_SPECIES } from '@/lib/constants';
import { PokemonSpecies } from './species';

export async function getPokemonSpecies(id: string) {
  
  const res = await fetch(`${API_URL_SPECIES}/${id}`);
  
  if (!res.ok) {
    throw new Error('Something went wrong while loading the Pokemon data!');
  }
  
  const data = await res.json();
  const pokemonSpeciesData = data as PokemonSpecies;

  if (!pokemonSpeciesData) {
    notFound();
  }
  return pokemonSpeciesData;
}
