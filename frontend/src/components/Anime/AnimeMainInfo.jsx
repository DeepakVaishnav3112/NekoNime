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
      <div className="flex-1">
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
                />
              ))}
            </div>

            {/* Rating and Popularity */}
            <StatDisplay averageScore={animeDetails.averageScore} popularity={animeDetails.popularity} />
          </div>
        </div>

        {/* Buttons */}
        <ActionButtons />
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
