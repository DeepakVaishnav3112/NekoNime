import { createContext, useState, useContext } from "react";

const GeneralContext = createContext();

export const GeneralProvider = ({ children }) => {
  const [search, setSearch] = useState("");
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const [viewAllSection, setViewAllSection] = useState(null);
  const [searchAnimeList, setSearchAnimeList] = useState([]);

  return (
    <GeneralContext.Provider
      value={{
        search,
        setSearch,
        dropDownOpen,
        setDropDownOpen,
        viewAllSection,
        setViewAllSection,
        searchAnimeList,
        setSearchAnimeList
      }}
    >
      {children}
    </GeneralContext.Provider>
  );
};

export const useGeneralContext = () => useContext(GeneralContext);
