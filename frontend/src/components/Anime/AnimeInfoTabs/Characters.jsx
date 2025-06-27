import { useEffect, useState } from "react";
import TabHeader from "./TabHeader";
import { fetchAnimeCharacters } from "../../../services/animeService";
import CharacterCard from "./CharacterCard";
import "../../../styles/scrollbar.css";
import Loader from "../../Common/Loader";

export default function Characters({ animeId }) {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadCharacters = async () => {
      try {
        setLoading(true);
        const res = await fetchAnimeCharacters(animeId);
          // console.log(res.data);
        setCharacters(res.data);
      } catch (error) {
        console.log("Error fetching characters: ", error);
      } finally {
        setLoading(false);
      }
    };

    loadCharacters();
  }, [animeId]);

  return (
    <div className="relative lg:px-3">
      <TabHeader heading="Characters And Voice Actors" showBtn={true} />

      {!characters || loading ? (
        <Loader />
      ) : (
        <div className="flex flex-col gap-2 h-[400px] mt-1 overflow-y-auto custom-scrollbar pb-10">
          {characters.map((character) => (
            <CharacterCard key={character.character.id} character={character} />
          ))}
        </div>
      )}

      <div className="absolute bottom-0 w-full h-10 bg-gradient-to-t from-white to-transparent transition duration-300 pointer-events-none z-10"></div>
    </div>
  );
}
