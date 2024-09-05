'use server'

import { getPokemon } from "../pokemon/getPokemon";
import { getPokemonIndex } from "../pokemon/getPokemonIndex";
import { Pokemon } from "../pokemon/pokemon";
import { PokemonIndex } from "../pokemon/PokemonIndex";

export async function fetchPokemonData(offset?: number, limit?: number) {
  
    const indexData = (await getPokemonIndex(
      offset ? offset : 0,
      limit ? limit : 99
    )) as PokemonIndex;
  
    const pokemonData = await Promise.all(
      indexData.results.map(async (result) => {
        const fetchPokemonList = await getPokemon(result.url);
        return fetchPokemonList as Pokemon;
      })
    );
    return { indexData, pokemonData };
  }