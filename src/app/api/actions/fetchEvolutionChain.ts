'use server';

import { API_URL } from '@/lib/constants';
import { ChainLink, EvolutionChain } from '../pokemon/evolutionChain';
import { getEvolutionChain } from '../pokemon/getEvolutionChain';
import { getPokemon } from '../pokemon/getPokemon';
import { Pokemon } from '../pokemon/pokemon';

// Helper function to recursively extract all Pokémon names from the evolution chain
const extractPokemonNames = (chain: ChainLink): string[] => {
  const names: string[] = [];

  names.push(chain.species.name);

  chain.evolves_to.forEach((nextChain) => {
    names.push(...extractPokemonNames(nextChain));
  });

  return names;
};

// Fetch function to get evolution chain and Pokémon data
export async function fetchEvolutionChain(url: string) {
  const evolutionData = (await getEvolutionChain(url)) as EvolutionChain;

  const pokemonNames = extractPokemonNames(evolutionData.chain);

  const pokemonData = await Promise.all(
    pokemonNames.map(async (name) => await getPokemon(`${API_URL}/${name}`))
  );
  
  return pokemonData as Pokemon[];
}
