import { useGeneralContext } from "../../context/GeneralContext";
import { useGenreContext } from "../../context/GenreContext";
import { animeGenres } from "../../utils/animeGenres";

export default function FiltersSection() {
  const { dropDownOpen, setDropDownOpen } = useGeneralContext();
  const { setSelectedGenre } = useGenreContext();

  return (
    <div
      className={`${
        dropDownOpen ? "block" : "hidden"
      } fixed flex bg-primary w-full px-5 md:px-30 py-5 z-50`}
    >
      <div className="lg:flex-1/2 text-white ">
        <h2 className="font-semibold text-xl">Genres</h2>
        <div className="flex flex-wrap gap-4 pt-3">
          {animeGenres.map((genre) => (
            <button
              key={genre}
              className="bg-primary-hover-bg text-primary-hover-text px-4 py-2 rounded-md cursor-pointer border-2 border-primary hover:bg-primary hover:border-primary-hover-bg hover:text-white transition hover:shadow hover:scale-105"
              onClick={() => {
                setSelectedGenre(genre);
                setDropDownOpen(false);
              }}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>
      <div className="lg:flex-1/2"></div>
    </div>
  );
}
