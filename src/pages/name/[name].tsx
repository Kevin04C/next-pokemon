import { GetStaticProps } from "next";
import { GetStaticPaths } from "next";
import { Layout } from "@/components/layouts";
import { pokeApi } from "@/api";
import { PokemonListResponse } from "@/interfaces";
import { FC, useState } from "react";
import { Button, Card, Container, Grid, Text } from "@nextui-org/react";
import { localFavorites } from "@/utils";
import Image from "next/image";
import confetti from "canvas-confetti";
import { getPokemonInfo } from "@/utils";
import { PokemonInfo } from "@/interfaces";

interface Props {
  pokemon: PokemonInfo;
}

const PokemonByname: FC<Props> = ({ pokemon }) => {
  const [isInFavorites, setExistFavorites] = useState<boolean>(
    localFavorites.existsFavorites(pokemon.id)
  );

  const onToggleFavorite = () => {
    const idAsNumber = Number(pokemon.id);
    localFavorites.toggleFavorites(idAsNumber);
    setExistFavorites(!isInFavorites);

    if (!isInFavorites) {
      confetti({
        particleCount: 100,
        spread: 160,
        angle: -100,
        origin: {
          x: 1,
          y: 0,
        },
      });
    }
  };

  return (
    <Layout title={pokemon.name}>
      <Grid.Container css={{ marginTop: "5px" }} gap={2}>
        <Grid xs={12} sm={4}>
          <Card isHoverable css={{ padding: "30px" }}>
            <Card.Body>
              <Card.Image
                src={
                  pokemon.sprites.other?.dream_world.front_default ??
                  "/no-image.png"
                }
                alt={pokemon.name}
                width="100%"
                height={200}
              />
            </Card.Body>
          </Card>
        </Grid>

        <Grid xs={12} sm={8}>
          <Card>
            <Card.Header
              css={{ display: "flex", justifyContent: "space-between" }}
            >
              <Text h1 transform="capitalize">
                {pokemon.name}
              </Text>
              <Button
                color="gradient"
                ghost={!isInFavorites}
                onPress={onToggleFavorite}
              >
                {isInFavorites
                  ? "Eliminar de favoritos"
                  : "Agregar a favoritos"}
              </Button>
            </Card.Header>
            <Card.Body>
              <Text size={30}>Sprites</Text>
              <Container direction="row" display="flex">
                <Image
                  src={pokemon.sprites.front_default}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.back_default}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.front_shiny}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.back_shiny}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
              </Container>
            </Card.Body>
          </Card>
        </Grid>
      </Grid.Container>
    </Layout>
  );
};

export default PokemonByname;

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const { data } = await pokeApi.get<PokemonListResponse>("/pokemon?limit=151");
  const { results } = data;

  const pokemonName: string[] = results.map((pokemon) => pokemon.name);

  return {
    paths: pokemonName.map((name) => ({
      params: { name },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { name } = ctx.params as { name: string };
  const pokemon = await getPokemonInfo(name);
  return {
    props: {
      pokemon,
    },
  };
};
