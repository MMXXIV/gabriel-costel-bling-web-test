'use server'

import { API_URL } from "@/lib/constants";
import { getPokemon } from "../pokemon/getPokemon";
import { Pokemon } from "../pokemon/pokemon";

export async function fetchSinglePokemonData(id: string) {
    const pokemonData = await getPokemon(`${API_URL}/${id}`)
    return pokemonData as Pokemon;
  }