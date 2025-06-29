import { createContext, useState, useContext, useEffect } from "react";

const GenreContext = createContext();

export const GenreProvider = ({ children }) => {
  const [selectedGenre, setSelectedGenre] = useState();

  return (
    <GenreContext.Provider value={{ selectedGenre, setSelectedGenre }}>
      {children}
    </GenreContext.Provider>
  );
};

export const useGenreContext = () => useContext(GenreContext);
