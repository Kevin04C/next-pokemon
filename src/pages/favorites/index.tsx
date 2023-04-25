import React, { useEffect, useState } from "react";
import { Layout } from "../../components/layouts/Layout";
import { NoFavorites } from "@/components/ui";
import { localFavorites } from "@/utils";
import { FavoritesPokemons } from "@/components/pokemon";

const FavoritesPage = () => {
  const [favoritesPokemon, setFavoritesPokemon] = useState<number[]>([]);

  useEffect(() => {
    const pokemons = localFavorites.pokemons();
    setFavoritesPokemon(pokemons);
  }, []);

  return (
    <Layout>
      {favoritesPokemon?.length === 0 ? (
        <NoFavorites />
      ) : (
        <FavoritesPokemons favorites={favoritesPokemon} />
      )}
    </Layout>
  );
};

export default FavoritesPage;
