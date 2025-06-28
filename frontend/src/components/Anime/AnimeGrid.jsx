import AnimeCard from "./AnimeCard";

export default function AnimeGrid({ animeList, visibleCards }) {
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      {animeList?.list?.slice(0, visibleCards ?? animeList.length).map((anime) => (
        <AnimeCard key={anime.id} anime={anime} />
      ))}
    </div>
  );
}
