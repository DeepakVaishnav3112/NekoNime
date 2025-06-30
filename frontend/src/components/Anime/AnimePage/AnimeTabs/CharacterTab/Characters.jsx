import { useCallback, useEffect, useRef, useState } from "react";
import { fetchAnimeCharacters } from "../../../../../services/animeService";
import CharacterCard from "./CharacterCard";
import Loader from "../../../../Common/Loader";
import SharedTabContainer from "../Common/SharedTabContainer";

export default function Characters({
  animeId,
  characters,
  setCharacters,
  loading,
  setLoading,
}) {
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);

  const loadCharacters = async (page) => {
    try {
      setLoading(true);
      const res = await fetchAnimeCharacters(animeId, page);
      const newCharacters = res.data.characters;
      const pageInfo = res.data.pageInfo;

      setCharacters((prev) => {
        const all = [...(prev || []), ...newCharacters];
        const seen = new Set();
        return all.filter((char) => {
          const key = char.character.id;
          if (seen.has(key)) return false;
          seen.add(key);
          return true;
        });
      });

      setHasNextPage(pageInfo.hasNextPage);
    } catch (error) {
      console.error("Error fetching characters:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!animeId || characters.length > 0) return;
    setCharacters([]);
    setPage(1);
    setHasNextPage(true);
    loadCharacters(1);
  }, [animeId]);

  useEffect(() => {
    if (page > 1) {
      loadCharacters(page);
    }
  }, [page]);

  // infinite scroll logic
  const observer = useRef(null);
  const lastCharacterRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          setPage((prevPage) => prevPage + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasNextPage]
  );

  return (
    <SharedTabContainer heading="Characters And Voice Actors" showBtn>
      {characters.length === 0 && !loading && (
        <p className="text-center text-secondary">No characters found.</p>
      )}

      {characters.map((character, idx) => {
        if (idx === characters.length - 1) {
          return (
            <div
              ref={lastCharacterRef}
              key={`${character.character.id}-${idx}`}
            >
              <CharacterCard character={character} />
            </div>
          );
        }
        return (
          <CharacterCard
            key={`${character.character.id}-${idx}`}
            character={character}
          />
        );
      })}
      {loading && <Loader />}
    </SharedTabContainer>
  );
}
