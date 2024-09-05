'use server'

import { getPokemonSpecies } from "../pokemon/getPokemonSpecies";
import { PokemonSpecies } from "../pokemon/species";

export async function fetchPokemonSpecies(id: string) {
    const pokemonData = await getPokemonSpecies(id)
    return pokemonData as PokemonSpecies;
  }