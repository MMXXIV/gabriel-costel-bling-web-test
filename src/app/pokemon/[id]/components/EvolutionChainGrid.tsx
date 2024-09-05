import { fetchEvolutionChain } from '@/app/api/actions/fetchEvolutionChain';
import { Pokemon } from '@/app/api/pokemon/pokemon';
import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, Suspense, useCallback } from 'react';

interface EvolutionChainGridProps {
  evolutionDataUrl: string;
}

export default function EvolutionChainGrid({
  evolutionDataUrl,
}: EvolutionChainGridProps) {
  const [data, setData] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const appendData = useCallback(async () => {
    const evolutionChainData = await fetchEvolutionChain(evolutionDataUrl);
    setData(evolutionChainData);
    setIsLoading(false);
  }, [evolutionDataUrl]);

  useEffect(() => {
    appendData();
  }, [appendData]); 

  if (isLoading) {
    return (
      <>
        <div className="grid grid-cols-3  gap-4">
          <Skeleton className="size-24 rounded-md" />
          <Skeleton className="size-24 rounded-md" />
          <Skeleton className="size-24 rounded-md" />
        </div>
      </>
    );
  } else {
    return (
        <div className="flex gap-4 md:items-end ">
          {data.map((pokemonData) => (
            <Link
              href={`/pokemon/${pokemonData.id}`}
              key={pokemonData.id}
              className="size-16 md:size-24 rounded-md bg-muted relative flex items-end justify-center  hover:bg-gray-300 group"
            >
              <Image
                unoptimized
                alt={`${pokemonData.name} image`}
                className="w-full md:-top-2 object-cover  md:p-4 filter drop-shadow-xl absolute z-10 group-hover:scale-125 transition-all ease-in-out duration-200"
                height="64"
                src={`${pokemonData.sprites.front_default}`}
                width="64"
              />
              <small className=" -mb-4 md:mb-2 capitalize text-xs   leading-none z-10 text-muted-foreground group-hover:text-black">
                {pokemonData.name}
              </small>
            </Link>
            
          ))}
        </div>
    );
  }
}
