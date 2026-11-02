import { createContext, useContext, useEffect, useState } from "react";

const FavoritesContext = createContext(null);

function load() {
  try {
    return JSON.parse(localStorage.getItem("wheelhub-favs")) || [];
  } catch {
    return [];
  }
}

export function FavoritesProvider({ children }) {
  const [favs, setFavs] = useState(load);

  useEffect(() => {
    try {
      localStorage.setItem("wheelhub-favs", JSON.stringify(favs));
    } catch {
      /* ignore */
    }
  }, [favs]);

  const toggle = (id) =>
    setFavs((f) => (f.includes(id) ? f.filter((x) => x !== id) : [...f, id]));

  return (
    <FavoritesContext.Provider value={{ favs, toggle }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export const useFavorites = () => useContext(FavoritesContext);
