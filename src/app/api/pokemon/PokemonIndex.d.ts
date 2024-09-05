
export interface PokemonIndex {
    count?:number
    next?:string
    previous?:string
    name: string
    url: string
    results:Pokemon[]
}