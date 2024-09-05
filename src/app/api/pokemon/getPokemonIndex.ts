'use server'

import { notFound } from 'next/navigation';
import { API_URL } from '@/lib/constants';
import { PokemonIndex } from './PokemonIndex';

export async function getPokemonIndex(offset: number, limit: number) {
  const res = await fetch(`${API_URL}/?offset=${offset}&limit=${limit}`);

  if (!res.ok) {
    throw new Error('Something went wrong while loading the Pokemon index!');
  }

  const data = await res.json();
  const pokemonIndex = data as PokemonIndex;

  if (!pokemonIndex) {
    notFound();
  }
  
  return pokemonIndex;
}
