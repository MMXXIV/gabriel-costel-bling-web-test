'use client';

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

import { PlusCircleIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

import { Pokemon } from '@/app/api/pokemon/pokemon';

import { useEffect, useState } from 'react';
import { MovesTableRow } from './MovesTableRow';
import { fetchPokemonData } from '@/app/api/actions/fetchPokemonData';
import { LIMIT } from '@/lib/constants';

export interface PokemonTableProps {
  pokemonMovesData: any;
}

export default function PokemonMovesTable({ pokemonMovesData }: PokemonTableProps) {
  const [offset, setOffset] = useState(0);
  const [data, setData] = useState<Pokemon[]>(pokemonMovesData);

  useEffect(() => {
    setData(pokemonMovesData);
  }, [pokemonMovesData]);

  const appendData = async () => {
    const newOffset = offset + LIMIT;
    setOffset(newOffset); // Update offset first
    const { pokemonData: newPokemonData } = await fetchPokemonData(
      newOffset,
      LIMIT
    );
    setData((prevData) => [...prevData, ...newPokemonData]); // Use functional update
  };

  if (data)
    return (
      <Card className="w-full h-screen">
        <CardHeader>
          <CardTitle>Move list</CardTitle>
          <CardDescription>
            All of the moves that this species can possibly learn.
          </CardDescription>
        </CardHeader>

        <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="">
              <TableHead className="table-cell">Image</TableHead>
              <TableHead className="hidden md:table-cell">ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="table-cell">Height</TableHead>

              <TableHead className="table-cell">Weight</TableHead>
              <TableHead className="table-cell">
                <span className="">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="gap-y-8">
            {data.map((pkmn) => (
                <MovesTableRow key={pkmn.id} pokemon={pkmn} />
            ))}
          </TableBody>
        </Table>
      </CardContent>
      
        <CardFooter>
          <div className="flex items-center w-full justify-end">
            <div className="flex">
              <Button variant="secondary" size="sm" onClick={appendData}>
                <PlusCircleIcon className="mr-2 h-4 w-4" />
                Load more
              </Button>
            </div>
          </div>
        </CardFooter>
      </Card>
    );
}
