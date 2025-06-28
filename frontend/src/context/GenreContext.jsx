import { createContext, useState, useContext, useEffect } from "react";

const GenreContext = createContext();

export const GenreProvider = ({ children }) => {
  const [selectedGenre, setSelectedGenre] = useState(
    () => localStorage.getItem("selectedGenre") || ""
  );

  useEffect(() => {
    if (selectedGenre) {
      localStorage.setItem("selectedGenre", selectedGenre);
    }
  }, [selectedGenre]);

  return (
    <GenreContext.Provider value={{ selectedGenre, setSelectedGenre }}>
      {children}
    </GenreContext.Provider>
  );
};

export const useGenreContext = () => useContext(GenreContext);
