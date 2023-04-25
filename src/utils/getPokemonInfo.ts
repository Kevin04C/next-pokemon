import { pokeApi } from "@/api";
import { Pokemon } from "../interfaces/";
import { PokemonInfo } from "@/interfaces/Pokemon-info";

export const getPokemonInfo = async (id: string): Promise<PokemonInfo> => {
  try {
    const { data } = await pokeApi.get<Pokemon>(`/pokemon/${id}`);
    const pokemon: PokemonInfo = {
      id: data.id,
      name: data.name,
      sprites: data.sprites,
    };
    return pokemon;
  } catch (error) {
    throw new Error("Error al obtener el pokemon");
  }
};
