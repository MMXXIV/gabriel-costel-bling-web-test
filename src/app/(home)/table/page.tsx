import { Suspense } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, PlusCircleIcon } from 'lucide-react';
import PokemonTable from './PokemonTable';
import { fetchPokemonData } from '@/app/api/actions/fetchPokemonData';
import { LIMIT } from '@/lib/constants';
import { Skeleton } from '@/components/ui/skeleton';



export default async function TablePage() {
  const { indexData, pokemonData } = await fetchPokemonData(0, LIMIT);

  if (indexData && pokemonData){
    return (
      <Card className="w-full h-full flex flex-col" id='table'>
        <CardContent>
            <PokemonTable pokemonData={pokemonData} />
        </CardContent>
      </Card>
    );
  }

}
