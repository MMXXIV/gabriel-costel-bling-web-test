import { getPokemon } from '@/app/api/pokemon/getPokemon';
import { API_URL, GIF_URL } from '@/lib/constants';
import Image from 'next/image';
import Link from 'next/link';

export default async function HeroSection() {
  const randomPokemon = Math.floor(Math.random() * (250 - 1) + 1);
  const pokemonData = await getPokemon(`${API_URL}/${randomPokemon}`);

  return (
    <section className="w-full h-full flex flex-col-reverse md:flex-row items-center justify-between px-10">
      <div className="md:w-1/2 flex flex-col gap-y-8">
        <div className="w-full h-full flex flex-col items-center  justify-center gap-y-8 z-0">
          <div className="w-full flex flex-col items-start  justify-center gap-2">
            <h4 className="text-4xl md:text-5xl font-light">
              Worlds biggest <span className="font-bold">pokemon library </span>
            </h4>
            <p className="hidden md:block ">
              We created{' '}
              <span className="font-jersey text-xl text-primary tracking-wide">
                {' '}
                PokeDock{' '}
              </span>
              as a way to give you organized data and insights about the pokemon
              world.
            </p>
          </div>
        </div>
        <div className="w-full flex flex-col md:flex-row items-center justify-center gap-4 z-00">
          <Link
            href={'/#table'}
            className="w-full  md:w-1/2 bg-primary px-8 py-3 rounded-lg text-center text-white "
          >
            Explore pokemon list
          </Link>

          <Link
            href={`/pokemon/${randomPokemon + 3}`}
            className="w-full md:w-1/2 border-2 border-secondary text-center  px-8 py-3 rounded-lg text-secondary "
          >
            Im felling lucky
          </Link>
        </div>
      </div>
      <div className="md:w-1/2 w-screen h-[50vh] md:h-[75vh] relative overflow-hidden flex  items-center  scale-105 z-0 md:translate-x-5">
        <Image
          alt={`${pokemonData.name} image`}
          className="bg-gray-200 rounded-md object-cover w-full scale-150 scale-"
          height="1080"
          src="/pokedex.webp"
          width="1920"
        />
        <Image
          alt={`${pokemonData.name} image`}
          className="hidden md:block aspect-square object-contain scale-50 p-5 absolute saturate-0 2xl:top-[31%] 2xl:left-[10rem] top-[32.5%] left-[7.5rem] 2xl:w-[15rem] w-[12rem]"
          height="64"
          src={`${GIF_URL}/${pokemonData.name}.gif`}
          width="64"
        />
        <div className="hidden md:flex pokedex">
          <div className="w-[5.5rem] h-[3.5rem] absolute top-[64%] left-[9rem] 2xl:top-[67%] 2xl:left-[12.5rem] opacity-60 flex items-center justify-center">
            <p className="capitalize font-jersey">{pokemonData.name}</p>
          </div>
          <div className="w-[10.5rem] h-[4rem] absolute top-[38%] left-[57%] 2xl:top-[37%] 2xl:left-[60%] opacity-60 flex items-center justify-center -skew-y-6 rotate-1 flex-row gap-2">
            {pokemonData.stats
              .filter(
                (stat) =>
                  stat.stat.name === 'hp' ||
                  stat.stat.name === 'attack' ||
                  stat.stat.name === 'defense'
              )
              .map((stat) => (
                <p
                  key={stat.stat.name}
                  className="capitalize text-white font-jersey w-1/6"
                >
                  {stat.stat.name.toLocaleUpperCase().slice(0, 3)}{' '}
                  {stat.base_stat}
                </p>
              ))}
          </div>
          <div className=" text-white w-[10.5rem] h-[4rem] absolute top-[67.2%] left-[50%] 2xl:top-[71%] 2xl:left-[52.5%] opacity-60 flex items-center justify-center skew-y-3 flex-row gap-2 font-jersey capitalize">
            {pokemonData.types[0].type.name}
          </div>
          <div className=" text-white w-[10.5rem] h-[4rem] absolute top-[68%] left-[63%] 2xl:top-[72%] 2xl:left-[65.5%] opacity-60 flex items-center justify-center skew-y-3 flex-row gap-2 font-jersey capitalize">
            EXP {pokemonData.base_experience}
          </div>
        </div>
      </div>
    </section>
  );
}
