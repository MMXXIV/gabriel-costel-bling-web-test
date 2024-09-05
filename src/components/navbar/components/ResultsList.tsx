// components/ResultsList.tsx
import React from 'react';
import Link from 'next/link';
import { Pokemon } from '@/app/api/pokemon/pokemon';
import ResultSkeleton from './ResultSkeleton';


interface ResultsListProps {
  pokemonResults: Pokemon[];
  loading: boolean;
  showResults: boolean;
}

const ResultsList: React.FC<ResultsListProps> = ({ pokemonResults, loading, showResults }) => {
  if (!showResults) return null;

  return (
    <div className="absolute top-full left-0 mt-2 w-full max-h-60 overflow-y-auto bg-white border border-gray-300 rounded-lg shadow-lg">
      {loading ? (
        <ResultSkeleton />
      ) : pokemonResults.length > 0 ? (
        <ul>
          {pokemonResults.map((pokemon) => (
            <li key={pokemon.id} className="p-2 hover:bg-gray-100">
              <Link href={`/pokemon/${pokemon.id}`} className="block">
                #{pokemon.id} - {pokemon.name}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <div className="p-2">No Pokémon found.</div>
      )}
    </div>
  );
};

export default ResultsList;
