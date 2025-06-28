import React from "react";
import { useGeneralContext } from "../../../context/GeneralContext";
import { useGenreContext } from "../../../context/GenreContext";
import { animeGenres, genreColors, genreIcons } from "../../../utils/genres";
import { useNavigate } from "react-router-dom";

export default function FiltersSection() {
  const { dropDownOpen, setDropDownOpen } = useGeneralContext();
  const { selectedGenre, setSelectedGenre } = useGenreContext();

  const navigate = useNavigate();

  return (
    <div
      className={`${
        dropDownOpen ? "block" : "hidden"
      } fixed flex bg-primary w-full px-5 md:px-30 py-5 z-50`}
    >
      <div className="lg:flex-1/2 text-white ">
        <h2 className="font-semibold text-xl">Genres</h2>
        <div className="flex flex-wrap gap-4 pt-3">
          {animeGenres.map((genre) => {
            const colors = genreColors[genre] || {
              bg: "#ccc",
              text: "#000",
              shadow: "#000",
            };

            const isSelected = selectedGenre === genre;

            const defaultStyles = {
              backgroundColor: isSelected ? "#fff" : colors.bg,
              color: isSelected ? colors.bg : colors.text,
              boxShadow: isSelected ? `0 6px 20px ${colors.shadow}` : "none",
            };
            return (
              <button
                key={genre}
                className={`flex items-center gap-2 px-4 py-2 text-sm rounded-md cursor-pointer transition hover:scale-105 hover:shadow-xl`}
                style={defaultStyles}
                onMouseEnter={(e) => {
                  if (isSelected) return;
                  e.currentTarget.style.boxShadow = `0 6px 20px ${colors.shadow}`;
                  e.currentTarget.style.backgroundColor = "#fff";
                  e.currentTarget.style.color = colors.bg;
                }}
                onMouseLeave={(e) => {
                  if (isSelected) return;
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.backgroundColor = colors.bg;
                  e.currentTarget.style.color = colors.text;
                }}
                onClick={() => {
                  setSelectedGenre(genre);
                  setDropDownOpen(false);
                  navigate("/browse")
                }}
              >
                <span className="text-md">
                  {genreIcons[genre] && React.createElement(genreIcons[genre])}
                </span>
                {genre}
              </button>
            );
          })}
        </div>
      </div>
      <div className="lg:flex-1/2"></div>
    </div>
  );
}
