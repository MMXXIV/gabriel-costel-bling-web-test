'use client';

import Image from 'next/image';
import { Search } from 'lucide-react';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { Input } from '../ui/input';
import { fetchPokemonData } from '@/app/api/actions/fetchPokemonData';
import { Pokemon } from '@/app/api/pokemon/pokemon';

const Navbar = () => {
  const [query, setQuery] = useState<string>('');
  const [debouncedQuery, setDebouncedQuery] = useState<string>('');
  const [pokemonResults, setPokemonResults] = useState<Pokemon[]>([]);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedQuery(query);
    }, 350);

    return () => {
      clearTimeout(timerId);
    };
  }, [query]);

  // Fetch Pokémon data when the debounced query changes
  useEffect(() => {
    const fetchData = async () => {
      if (debouncedQuery) {
        setLoading(true); // Set loading to true when fetching starts
        try {
          const result = await fetchPokemonData(); // Fetch the first page of the Pokémon list
          const filteredData = result.pokemonData.filter(
            (pokemon: Pokemon) =>
              pokemon.name
                .toLowerCase()
                .includes(debouncedQuery.toLowerCase()) ||
              pokemon.id.toString().includes(debouncedQuery)
          );
          setPokemonResults(filteredData); // Set the filtered Pokémon data
          setShowResults(true);
        } catch (error) {
          console.error(error); // Handle the error
        } finally {
          setLoading(false); // Set loading to false after fetching completes
        }
      } else {
        setShowResults(false);
      }
    };

    fetchData();
  }, [debouncedQuery]);

  return (
    <div className="h-20 w-screen p-4 flex items-center justify-between bg-white shadow-md md:px-10">
      {/* Left side: Logo */}
      <div className="md:w-1/4 w-2/4">
        <Link
          href="/"
          className="font-jersey md:text-4xl  text-3xl md:tracking-wider text-primary"
        >
          PokeDock
        </Link>
      </div>

      <div
        className={`${
          showResults ? 'flex' : 'hidden'
        } w-screen h-screen absolute bg-black bg-opacity-20 backdrop-blur-sm z-40 top-20 left-0 transition-all ease-in-out duration-500`}
      ></div>
      {/* Right side: Search bar */}
      <div className="justify-end relative  flex z-40 w-full md:w-1/4">
        <div className="relative ml-auto flex-1 md:grow-0">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Pokémon by name or ID..."
            className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
          />
        </div>

        {/* Popup for showing results */}
        {showResults && pokemonResults.length > 0 && (
          <div className="absolute top-full left-0 mt-8 w-full max-h-[100vh] overflow-y-auto ">
            <ul className="space-y-2">
              {pokemonResults.map((pokemon: Pokemon) => (
                <div
                  key={pokemon.id}
                  className="w-full flex items-center gap-4 p-4 bg-white rounded-md"
                >
                  <Image
                    unoptimized
                    alt={`${pokemon.name} image`}
                    className="size-16 aspect-square rounded-md object-cover"
                    height="25"
                    src={`${pokemon.sprites.front_default}`}
                    width="25"
                  />
                  <li className="p-2 hover:bg-gray-100 capitalize font-semibold">
                    <Link href={`/pokemon/${pokemon.id}`} className="block">
                      #{pokemon.id} - {pokemon.name}
                    </Link>
                  </li>
                </div>
              ))}
            </ul>
          </div>
        )}

        {/* Show "No Results" message if nothing is found */}
        {showResults && pokemonResults.length === 0 && (
          <div className="absolute top-full left-0 mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg p-4">
            No results found.
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
