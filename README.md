Hi there ! 👋 
Welcome to PokeDock, a wonderful index of the Pokemon world.

This website was built as part of my interview process at Bling and i frankly had a lot of fun building it, i hope you enjoy exploring it.

## Getting Started
I took into consideration the time requirements for this project, so i decided to use [Shadcn/ui](https://ui.shadcn.com/) to leverage their components as the main UI of the site, and save some time while keeping a good aesthetic.

The [Next.js App Router](https://nextjs.org/docs/app) was choosen as the routing option over the Pages Router because of its Server Actions, wich i used to develop this small fun project fast.

## Functionality
The hero section loads a random pokemon animation and a few stats on a Pokedex.

I used the [PokeAPI] (https://pokeapi.co/) for the vast majority of the data fetching, however during the first analysis i came across [Pokexperto](https://pokexperto.net/) and we made use of their API to fetch some GIF's, wich were used to give the Pokedex in the hero section a better feel.

You can search by any of the fields that are displayed on the index table, youll have to load more if you dont see one that you are looking for. 

For the "Type" row in the index table, i slightly modified the [Badge](https://ui.shadcn.com/docs/components/badge) component from Shadcn to represent each pokemon's type.




