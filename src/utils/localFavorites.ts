const toggleFavorites = (id: number) => {
  console.log("toggleFavorites Llamado");

  let favorites: number[] = JSON.parse(
    localStorage.getItem("favorites") ?? "[]"
  );

  if (favorites.includes(id)) {
    favorites = favorites.filter((pokeId) => pokeId !== id);
  } else {
    favorites = [...favorites, id];
  }

  localStorage.setItem("favorites", JSON.stringify(favorites));
};

const existsFavorites = (id: number): boolean => {
  if (typeof window === 'undefined') return false;

  const favorites: number[] = JSON.parse(
    localStorage.getItem("favorites") ?? "[]"
  );

  return favorites.includes(id);
};

const pokemons = (): number[] => {
  const pokemons = JSON.parse(localStorage.getItem("favorites") ?? "[]");
  return pokemons;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  toggleFavorites,
  existsFavorites,
  pokemons
};
