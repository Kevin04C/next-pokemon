import { GetStaticPaths, GetStaticProps } from "next";
import { FC, useEffect, useState } from "react";
import { Layout } from "@/components/layouts";
import { Grid, Card, Text, Button, Container, Image } from "@nextui-org/react";
import { localFavorites } from "@/utils";
import confetti from "canvas-confetti";
import { getPokemonInfo } from "@/utils";
import { PokemonInfo } from "@/interfaces";
import { useRouter } from "next/router";

interface Props {
  pokemon: PokemonInfo;
}

const PokemonPage: FC<Props> = ({ pokemon }) => {
  const router = useRouter();
  const [isInFavorites, setExistFavorites] = useState<boolean>(false);

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

  useEffect(() => {
    const exists = localFavorites.existsFavorites(pokemon.id);
    setExistFavorites(exists);
  }, [pokemon]);

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

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const pokemonsNumbers = Array.from({ length: 151 }, (_, i) => `${i + 1}`);

  return {
    paths: pokemonsNumbers.map((id) => ({
      params: { id },
    })),
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params as { id: string };
  const pokemon = await getPokemonInfo(id);

  if (pokemon instanceof Error) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      pokemon,
    },
    revalidate: 864000,
  };
};

export default PokemonPage;
