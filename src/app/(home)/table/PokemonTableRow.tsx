import Image from 'next/image';
import { Badge } from '@/components/ui/badge';

import { TableCell, TableRow } from '@/components/ui/table';
import { Pokemon } from '@/app/api/pokemon/pokemon';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function PokemonTableRow({ pokemon }: { pokemon: Pokemon }) {
  const pokeType = pokemon.types;

  // THE WEIGHT AND HEIGHT ARE ACTUALLY SWITCHED UP IN THE API
  return (
    <TableRow className="text-center">
      <TableCell className="sm:table-cell size-4  md:size-36">
        <Image
          unoptimized
          alt={`${pokemon.name} image`}
          className="aspect-square bg-gray-200 rounded-md object-cover"
          height="256"
          src={`${pokemon.sprites.front_default}`}
          width="256"
        />
      </TableCell>

      <TableCell className="md:table-cell">{pokemon.id}</TableCell>

      <TableCell className="font-medium text-xl capitalize">
        {pokemon.name}
      </TableCell>

      <TableCell className="flex-col space-y-2 md:space-x-2">
        {pokeType.map((typeObj) => (
          <Badge
            key={typeObj.type.name}
            variant="outline"
            type={typeObj.type.name}
            className={`capitalize   bg-${typeObj.type.name}`}
          >
            {typeObj.type.name}
          </Badge>
        ))}
      </TableCell>

      <TableCell className="md:table-cell ">{`${
        pokemon.weight > 100
          ? `${pokemon.weight / 100} m`
          : `${pokemon.weight} cm`
      }`}</TableCell>

      <TableCell className=" md:table-cell">{`${
        pokemon.height > 1000
          ? `${pokemon.height / 1000} t`
          : `${pokemon.height} kg`
      }`}</TableCell>

      <TableCell>
        <Button>
          <Link href={`/pokemon/${pokemon.name}`}>View details</Link>
        </Button>
      </TableCell>
    </TableRow>
  );
}
