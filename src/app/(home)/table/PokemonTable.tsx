'use client';

import React, { useState, useEffect } from 'react';
import {
  useReactTable,
  ColumnDef,
  SortingState,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  FilterFn,
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from '@/components/ui/table';
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircleIcon, Loader2Icon, ArrowUpDown } from 'lucide-react';

import { Pokemon } from '@/app/api/pokemon/pokemon';
import { fetchPokemonData } from '@/app/api/actions/fetchPokemonData';
import { LIMIT } from '@/lib/constants';
import RowSkeleton from './RowSkeleton';
import { PokemonTableRow } from './PokemonTableRow'; // Import the table row component
import { Input } from '@/components/ui/input';

// Define custom filtering function to search across multiple columns
const globalFilterFn: FilterFn<Pokemon> = (row, columnId, value) => {
  const searchValue = String(value).toLowerCase();

  // Check ID, Name, and Type
  const matchesID = String(row.original.id).includes(searchValue);
  const matchesName = row.original.name.toLowerCase().includes(searchValue);
  const matchesType = row.original.types.some((typeObj) =>
    typeObj.type.name.toLowerCase().includes(searchValue)
  );
  const matchesHeight = String(row.original.height).includes(searchValue);
  const matchesWeight = String(row.original.weight).includes(searchValue);

  // Return true if any of the fields match the search value
  return (
    matchesID || matchesName || matchesType || matchesHeight || matchesWeight
  );
};

export interface PokemonTableProps {
  pokemonData: Pokemon[];
}

export default function PokemonTable({ pokemonData }: PokemonTableProps) {
  const [data, setData] = useState<Pokemon[]>(pokemonData);
  const [isLoading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState(''); // Global filter state

  const columns: ColumnDef<Pokemon>[] = [
    {
      header: 'Image',
    },
    {
      accessorKey: 'id',
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="md:flex w-full"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          ID <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    {
      accessorKey: 'name',
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="flex w-full"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Name <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    {
      accessorKey: 'types',
      header: 'Type',
    },
    {
      accessorKey: 'height',
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="md:flex w-full"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Height <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    {
      accessorKey: 'weight',
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="md:flex w-full"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Weight <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    {
      header: 'Action',
    },
  ];

  const table = useReactTable({
    data,
    columns,
    state: { sorting, globalFilter },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn,
  });

  const appendData = async () => {
    setLoading(true);
    const newOffset = offset + LIMIT;
    setOffset(newOffset);
    const { pokemonData: newPokemonData } = await fetchPokemonData(
      newOffset,
      LIMIT
    );
    setData((prevData) => [...prevData, ...newPokemonData]);
    setLoading(false);
  };

  return (
    <>
      <CardHeader>
        <CardTitle>Pokemon index list</CardTitle>
        <CardDescription className="w-full  justify-between flex flex-col md:flex-row items-center gap-4">
          <p>Get insights and relevant data about all pokemons.</p>
          <Input
            placeholder="Search Pokémon by any field..."
            value={globalFilter}
            onChange={(event) => setGlobalFilter(event.target.value)}
            className="max-w-sm"
          />
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Table className="border rounded-lg  overflow-hidden ">
          <TableHeader className=' bg-gray-50'>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="">
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <PokemonTableRow key={row.id} pokemon={row.original} /> // Use the custom row component
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results found.
                </TableCell>
              </TableRow>
            )}
            {isLoading && <RowSkeleton cells={7} />}{' '}
            {/* Adjust for the correct number of cells */}
          </TableBody>
        </Table>
      </CardContent>

      <CardFooter className="w-full">
        <div className="flex items-center w-full justify-end">
          <Button
            disabled={isLoading}
            variant="secondary"
            className="w-full md:w-36"
            size="sm"
            onClick={appendData}
          >
            {isLoading ? (
              <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <PlusCircleIcon className="mr-2 h-4 w-4" />
            )}
            {isLoading ? 'Loading...' : 'Load more'}
          </Button>
        </div>
      </CardFooter>
    </>
  );
}
