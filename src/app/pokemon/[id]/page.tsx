'use client';

import Image from 'next/image';
import Navbar from '@/components/navbar/Navbar';

import { useParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';

import { Pokemon } from '@/app/api/pokemon/pokemon';
import { PokemonSpecies } from '@/app/api/pokemon/species';

import { fetchSinglePokemonData } from '@/app/api/actions/fetchSinglePokemonData';

import PokemonDetailPage from './PokemonDetailPage';
import { fetchPokemonSpecies } from '@/app/api/actions/fetchPokemonSpecies';

export default function Page() {
  const [data, setData] = useState<Pokemon | null>(null);
  const [speciesData, setSpeciesData] = useState<PokemonSpecies | null>(null);

  const params = useParams();

  const appendData = async (id: string) => {
    try {
      const singlePokemonData = (await fetchSinglePokemonData(id)) as Pokemon;
      const species = (await fetchPokemonSpecies(id)) as PokemonSpecies;

      setData(singlePokemonData);
      setSpeciesData(species);
    } catch (error) {
      console.error(`Failed to fetch pokemon ${id} data:`, error);
    }
  };

  useEffect(() => {
    const idRaw = params.id;
    if (idRaw) {
      const id = idRaw.toString();
      appendData(id);
    }
  }, [params]);

  if (data && speciesData)
    return (
      <>
        <Navbar />
        <div className="bg-gray-200 md:p-20 p-10 translate-y-20 md:translate-y-10">
          <PokemonDetailPage pokemonData={data} pokemonSpecies={speciesData} />
        </div>
      </>
    );
}
