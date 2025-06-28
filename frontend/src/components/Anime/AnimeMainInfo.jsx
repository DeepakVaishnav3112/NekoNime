import AnimeCoverImage from "./AnimeCoverImage";
import AnimeDescription from "./AnimeDescription";
import AnimeInfoHeader from "./AnimeInfoHeader";
import GenreTag from "./GenreTag";
import { genreColorsMap, genreTextColorsMap } from "../../utils/formatColors";
import StatDisplay from "./StatDisplay";
import ActionButtons from "./ActionButtons";

export default function AnimeMainInfo({
  animeDetails,
  showDescription,
  showMore,
  setShowMore,
}) {
  return (
    <>
      <div className="flex-1 flex flex-col">
        <div className="flex gap-4">
          {/* Cover Image */}
          <AnimeCoverImage
            src={animeDetails.coverImage.extraLarge}
            alt={animeDetails.title.english || animeDetails.title.romaji}
          />

          {/* Title and Description and Info */}
          <div className="flex flex-col justify-around">
            <AnimeInfoHeader
              title={animeDetails.title.english || animeDetails.title.romaji}
              altTitle={
                animeDetails.title.english === animeDetails.title.romaji
                  ? ""
                  : animeDetails.title.romaji
              }
              format={animeDetails.format}
              episodes={animeDetails.episodes}
              duration={animeDetails.duration}
              startDate={animeDetails.startDate}
            />

            {/* Description for large devices */}
            {!showDescription && (
              <AnimeDescription
                description={animeDetails.description}
                showMore={showMore}
                setShowMore={setShowMore}
              />
            )}

            {/* Genres */}
            <div className="flex flex-wrap gap-2 mt-3 text-xs">
              {animeDetails.genres.map((genre) => (
                <GenreTag
                  key={genre}
                  genre={genre}
                  color={genreColorsMap[genre] || "#999"}
                  textColor={genreTextColorsMap[genre] || "#fff"}
                  padding={[4, 2]}
                  textSize="10"
                />
              ))}
            </div>

            {/* Rating and Popularity */}
            <StatDisplay
              averageScore={animeDetails.averageScore}
              popularity={animeDetails.popularity}
            />
          </div>
        </div>

        {/* Buttons */}
        <ActionButtons />

        {/* NekoNime Summary Box with Neko Girl Image For Desktop */}
        <div className="hidden md:flex items-center gap-4 grow bg-gradient-to-r from-secondary to-primary-hover-bg shadow mt-2 rounded-md px-3 py-2">
          <img
            src="/NekoGirl_1.jpg"
            alt=""
            className="w-18 h-18 rounded-full"
            style={{
              imageRendering: "crisp-edges",
              transform: "translateZ(0)",
            }}
          />
          <p className="text-white text-sm pr-4">
            <span className="text-primary font-bold text-xl">NekoNime</span> lets you explore anime, track what you’ve watched, and
            manage your personal lists—all in one cute and simple platform made
            just for anime lovers like you~! 🐾
          </p>
        </div>
      </div>

      {/* Description for small devices */}
      {showDescription && (
        <AnimeDescription
          description={animeDetails.description}
          showMore={showMore}
          setShowMore={setShowMore}
        />
      )}
    </>
  );
}
