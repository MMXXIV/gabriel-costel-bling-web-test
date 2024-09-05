export interface Pokemon {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  is_default: boolean;
  order: number;
  weight: number;
  abilities: Ability[];
  forms: Form[];
  game_indices: GameIndex[];
  held_items: HeldItem[];
  location_area_encounters: string;
  moves: Move[];
  species: Species;
  sprites: Sprites;
  cries: Cries;
  stats: Stat[];
  types: Type[];
  past_types: PastType[];
}

export interface Ability {
  is_hidden: boolean;
  slot: number;
  ability: NamedAPIResource;
}

export interface NamedAPIResource {
  name: string;
  url: string;
}

export interface Form extends NamedAPIResource {}

export interface GameIndex {
  game_index: number;
  version: NamedAPIResource;
}

export interface HeldItem {
  item: NamedAPIResource;
  version_details: VersionDetail[];
}

export interface VersionDetail {
  rarity: number;
  version: NamedAPIResource;
}

export interface Move {
  move: NamedAPIResource;
  version_group_details: VersionGroupDetail[];
}

export interface VersionGroupDetail {
  level_learned_at: number;
  version_group: NamedAPIResource;
  move_learn_method: NamedAPIResource;
}

export interface Species extends NamedAPIResource {}

export interface Sprites {
  back_default: string | null;
  back_female: string | null;
  back_shiny: string | null;
  back_shiny_female: string | null;
  front_default: string | null;
  front_female: string | null;
  front_shiny: string | null;
  front_shiny_female: string | null;
  other?: {
      dream_world: DreamWorldSprites;
      home: HomeSprites;
      "official-artwork": OfficialArtworkSprites;
      showdown: ShowdownSprites;
  };
  versions?: Record<string, GenerationSprites>;
}

export interface DreamWorldSprites {
  front_default: string | null;
  front_female: string | null;
}

export interface HomeSprites {
  front_default: string | null;
  front_female: string | null;
  front_shiny: string | null;
  front_shiny_female: string | null;
}

export interface OfficialArtworkSprites {
  front_default: string | null;
  front_shiny: string | null;
}

export interface ShowdownSprites {
  back_default: string | null;
  back_female: string | null;
  back_shiny: string | null;
  back_shiny_female: string | null;
  front_default: string | null;
  front_female: string | null;
  front_shiny: string | null;
  front_shiny_female: string | null;
}

export interface GenerationSprites {
  [key: string]: {
      back_default: string | null;
      back_gray?: string | null;
      back_shiny?: string | null;
      front_default: string | null;
      front_gray?: string | null;
      front_shiny?: string | null;
  };
}

export interface Cries {
  latest: string;
  legacy: string;
}

export interface Stat {
  base_stat: number;
  effort: number;
  stat: NamedAPIResource;
}

export interface Type {
  slot: number;
  type: NamedAPIResource;
}

export interface PastType {
  generation: NamedAPIResource;
  types: Type[];
}
