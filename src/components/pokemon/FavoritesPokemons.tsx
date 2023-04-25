import { Grid } from "@nextui-org/react";
import { FC } from "react";
import { FavoriteCardPokemon } from "./";

interface Props {
  favorites: number[];
}
export const FavoritesPokemons: FC<Props> = ({ favorites }) => {
  return (
    <Grid.Container gap={2} direction="row" css={{ padding: 10 }}>
      {favorites.map((id) => (
        <FavoriteCardPokemon key={id} id={id} />
      ))}
    </Grid.Container>
  );
};
