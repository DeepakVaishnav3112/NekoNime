import { FaStar } from "react-icons/fa";
import { BsFillBookmarkPlusFill } from "react-icons/bs";
import { FaShare } from "react-icons/fa";
import { FaPlay } from "react-icons/fa";
import { genreColorsMap, genreTextColorsMap } from "../../utils/animeGenres";
import { months } from "../../utils/animeGenres";
import { useState } from "react";

export default function AnimeCard({ anime }) {
  const [isHoverd, setIsHovered] = useState(false);

  return (
    <div
      className={`min-w-[206px] sm:w-[206px] ${
        isHoverd ? "scale-102" : ""
      } transition`}
      onMouseOver={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex w-full p-1 pr-0 cursor-pointer">
        {/* Cover Image */}
        <div className="relative z-[-1]">
          <img
            src={anime.coverImage.large}
            alt={anime.title.english || anime.title.romaji}
            className="min-w-[140px] h-[220px] rounded-md shadow-md"
          />

          {/* Rating */}
          {anime.averageScore && (
            <div className="absolute bottom-0 bg-primary rounded-full m-1 px-2 py-1 flex gap-1 items-center">
              <FaStar color="yellow" className="text-md" />
              <span className="text-white text-xs">
                {`${(anime.averageScore / 10).toFixed(1)}/10`}
              </span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col items-center flex-1/6 gap-4 py-2 px-2">
          <span className="cursor-pointer bg-primary text-white p-2 rounded-full hover:scale-110 hover:bg-secondary hover:text-primary-hover-text transition">
            <BsFillBookmarkPlusFill className="text-lg " />
          </span>
          <span className="cursor-pointer bg-primary text-white p-2 rounded-full hover:scale-110 hover:bg-secondary hover:text-primary-hover-text transition">
            <FaStar className="text-lg " />
          </span>
          <span className="cursor-pointer bg-primary text-white p-2 rounded-full hover:scale-110 hover:bg-secondary hover:text-primary-hover-text transition">
            <FaPlay className="text-lg " />
          </span>
          <span className="cursor-pointer bg-primary text-white p-2 rounded-full hover:scale-110 hover:bg-secondary hover:text-primary-hover-text transition">
            <FaShare className="text-lg " />
          </span>
        </div>
      </div>

      <div className="flex flex-col px-1">
        {/* Title */}
        <h3 title={anime.title.english || anime.title.romaji} className="text-primary text-md font-bold cursor-pointer truncate overflow-hidden whitespace-nowrap hover:text-secondary">
          {anime.title.english || anime.title.romaji}
        </h3>

        {/* Genres */}
        <div className="flex flex-wrap gap-1 mt-1">
          {anime.genres.slice(0, 3).map((genre) => (
            <span
              key={genre}
              className="text-[9px] px-2 py-1 rounded-full"
              style={{
                backgroundColor: genreColorsMap[genre] || "#999",
                color: genreTextColorsMap[genre] || "#fff",
              }}
            >
              {genre}
            </span>
          ))}
        </div>

        <div className="flex justify-between items-center text-[10px] mt-2">
          {/* Format and Episodes */}
          <div className="flex gap-1 items-center font-medium text-white">
            {anime.format && (
              <span className="bg-secondary px-2 py-1 pt-[5px] rounded-s-md">
                {anime.format}
              </span>
            )}
            {anime.episodes && (
              <span className="bg-primary px-2 py-1 pt-[5px] rounded-e-md">
                {anime.episodes}
              </span>
            )}
          </div>

          {/* Release Date */}
          {anime.startDate && (
            <div className="text-secondary pt-1">
              {`${anime.startDate.month ? months[anime.startDate.month - 1] : ""} ${
                anime.startDate.day ? anime.startDate.day : ""
              }, ${anime.startDate.year ? anime.startDate.year : ""}`}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
