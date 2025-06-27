import { createContext, useContext, useState } from "react";

const AnimeDetailsContext = createContext();

export const AnimeDetailsProvider = ({ children }) => {
  const [selectedLanguage, setSelectedLanguge] = useState("Japanese");

  return (
    <AnimeDetailsContext.Provider
      value={{ selectedLanguage, setSelectedLanguge }}
    >
      {children}
    </AnimeDetailsContext.Provider>
  );
};

export const useAnimeDetailsContext = () => useContext(AnimeDetailsContext);
