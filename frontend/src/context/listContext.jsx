import { createContext, useContext, useState, useEffect, useRef } from "react";

const listContext = createContext();

export const ListProvider = ({ children }) => {
  const [showListContainer, setShowListContainer] = useState(false);
  const [animeDetails, setAnimeDetails] = useState(null);

  return (
    <listContext.Provider
      value={{
        showListContainer,
        setShowListContainer,
        animeDetails,
        setAnimeDetails,
      }}
    >
      {children}
    </listContext.Provider>
  );
};

export const useListContext = () => useContext(listContext);
