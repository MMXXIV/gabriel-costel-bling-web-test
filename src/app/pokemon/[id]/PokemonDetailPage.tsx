import Image from 'next/image';

import { Pokemon } from '@/app/api/pokemon/pokemon';
import { PokemonSpecies } from '@/app/api/pokemon/species';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

import EvolutionChainGrid from './components/EvolutionChainGrid';
import { GenderChart } from './components/charts/GenderChart';
import { DimensionsChart } from './components/charts/DimensionsChart';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { BaseStatsChart } from './components/charts/BaseStatsChart';
import { EffortChart } from './components/charts/EffortChart';
import PokemonCries from './components/PokemonCries';
import PokemonMovesTable from './components/table/PokemonMovesTable';

interface PokemonDetailPageProps {
  pokemonData: Pokemon;
  pokemonSpecies: PokemonSpecies;
}

export default function PokemonDetailPage({
  pokemonData,
  pokemonSpecies,
}: PokemonDetailPageProps) {
  const [isShinySprite, setShinySprite] = useState(false);
  const [backSprite, setBackSprite] = useState(false);

  function toggleShinySprite() {
    return setShinySprite(!isShinySprite);
  }
  function toggleBackSprite() {
    return setBackSprite(!backSprite);
  }

  function getPokemonSprite() {
    if (isShinySprite) {
      return backSprite
        ? pokemonData.sprites.back_shiny
        : pokemonData.sprites.front_shiny;
    } else {
      return backSprite
        ? pokemonData.sprites.back_default
        : pokemonData.sprites.front_default;
    }
  }

  const flavourText = pokemonSpecies.flavor_text_entries[0].flavor_text;
  const evolutionDataUrl = pokemonSpecies.evolution_chain.url;
  const genderRate = pokemonSpecies.gender_rate;
  const baseStats = pokemonData.stats;
  const battleCries = pokemonData.cries;
  const pokemonMoves = pokemonData.moves

  console.log(baseStats);

  if (pokemonData)
    return (
      <>
        <main className="w-full h-full flex flex-col gap-3 md:gap-8">
          <div className="h-1/2 w-full gap-3 md:gap-6 flex flex-col md:flex-row">
            <Card className="relative md:w-1/5 min-h-full rounded-md  flex flex-col justify-center">
              <Image
                unoptimized
                alt={`${pokemonData.name} image`}
                className="w-full mt-4 object-cover p-4 filter drop-shadow-xl z-0"
                height="64"
                src={`${getPokemonSprite()}`}
                width="64"
              />

              <div className="w-full flex absolute top-0 gap-2 p-5 z-10  justify-between">
                <Button onClick={toggleShinySprite} variant={'outline'}>
                  {isShinySprite ? 'Shiny' : 'Regular'}
                </Button>
                <Button onClick={toggleBackSprite} variant={'outline'}>
                  {backSprite ? 'Back' : 'Front'}
                </Button>
              </div>
            </Card>
            <Card className="md:w-4/5 h-full rounded-md py-8 px-10 flex flex-col">
              <div className="flex relative justify-between items-center">
                <div className="w-full relative">
                  <div className="flex gap-2 items-start md:items-center flex-col md:flex-row">
                    <h3 className="mr-5 capitalize text-4xl font-extrabold tracking-tight lg:text-5xl">
                      {pokemonData.name}
                    </h3>
                    <div className="w-full flex gap-2  justify-start">
                    {pokemonData.types.map((typeObj) => (
                      <Badge
                        key={typeObj.type.name}
                        variant="outline"
                        type={typeObj.type.name}
                        className={`w-28 h-8 text-xl capitalize flex items-center justify-center bg-${typeObj.type.name}`}
                      >
                        {typeObj.type.name}
                      </Badge>
                    ))}
                    </div>
                  </div>
                  <blockquote className="mt-6 border-l-4 pl-6 italic">
                    {`"${flavourText}"`}
                  </blockquote>
                </div>
                <p className="font-mono top-0 right-0 absolute md:text-5xl text-muted-foreground">#0{pokemonData.id}</p>
              </div>

              <div className="w-full h-1/2 mt-6 flex md:flex-row flex-col justify-between items-end gap-6">
                <div className="w-full md:w-1/4 flex justify-start flex-col">
                  <h3 className="text-2xl font-semibold tracking-tight">
                    Dimensions
                  </h3>
                  <div className="w-full flex gap-2 items-start flex-row flex-wrap">
                    <div className="text-sm  flex items-center justify-center rounded-sm">
                      <Badge
                        variant="secondary"
                        className="capitalize text-sm  flex items-center justify-center rounded-sm"
                      >
                        {pokemonData.height < 100
                          ? pokemonData.height / 10
                          : pokemonData.height}
                        {pokemonData.height < 100 ? 'm' : 'cm'}
                      </Badge>
                    </div>
                    <div className="text-sm  flex items-center justify-center rounded-sm">
                      <Badge
                        variant="secondary"
                        className="capitalize text-sm  flex items-center justify-center rounded-sm"
                      >
                        {pokemonData.weight > 1000
                          ? pokemonData.weight / 100
                          : pokemonData.weight / 10}
                        {pokemonData.weight > 1000 ? 't' : 'kg'}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-2/4 flex items-end md:items-start justify-end md:justify-start flex-col">
                  <h3 className="text-2xl font-semibold tracking-tight">
                    Abilities
                  </h3>
                  <div className="flex gap-2 md:items-start items-end flex-row flex-wrap">
                    {pokemonData.abilities.map((ability) => (
                      <Badge
                        key={ability.ability.name}
                        variant="secondary"
                        className="capitalize text-sm  flex items-center justify-center rounded-sm"
                      >
                        {ability.ability.name}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="w-full md:w-2/4 ">
                  <h3 className="text-2xl font-semibold md:text-right  tracking-tight">
                    Evolution chain
                  </h3>
                  <div className="w-full flex md:gap-10 justify-end ">
                    <EvolutionChainGrid evolutionDataUrl={evolutionDataUrl} />
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <div className="w-full gap-3 md:gap-6 flex flex-col md:flex-row">
            <div className="w-full  md:w-1/3">
              <BaseStatsChart baseStats={baseStats} />
            </div>
            <div className="w-full md:w-1/3">
              <GenderChart genderRatio={genderRate} />
            </div>
            <div className="w-full md:w-1/3">
              <EffortChart baseStats={baseStats}/>
            </div>
            <div className="w-full md:w-1/3">
              <PokemonCries cries={battleCries} />
            </div>
          </div>
        </main>
      </>
    );
}
