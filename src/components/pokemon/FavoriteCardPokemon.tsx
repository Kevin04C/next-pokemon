import { Grid, Card, Image } from "@nextui-org/react";
import { useRouter } from "next/router";
import React, { FC } from "react";

interface Props {
  id: number;
}

export const FavoriteCardPokemon: FC<Props> = ({ id }) => {
  const router = useRouter()

  const onClick = () => {
    router.push(`/pokemon/${id}`)
  }

  return (
    <Grid xs={6} sm={3} md={2} xl={1} onClick={onClick}>
      <Card isHoverable isPressable>
        <Card.Body>
          <Image
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`}
            alt="image del pokemon"
            width="100%"
            height={140}
          />
        </Card.Body>
      </Card>
    </Grid>
  );
};
