import { useState } from "react";
import { GoDotFill } from "react-icons/go";
import { MdCancel } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { removeFromDefaultList } from "../../services/listService";

export default function ListEntryCard({ anime, onRemove }) {
  const [isHoverd, setIsHovered] = useState(false);

  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/anime/${anime.animeId}`);
  };

  const handleRemoveClick = async (animeListEntryId) => {
    try {
      const res = await removeFromDefaultList(animeListEntryId);
      console.log(res.data);
      if (onRemove) onRemove(animeListEntryId); // 👈 Notify parent
    } catch (err) {
      console.error("Failed to remove from list:", err);
    }
  };

  return (
    <div
      className={`flex items-center justify-between px-4 ${isHoverd && "border-r-4 border-primary"}`}
      onMouseOver={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center gap-2">
        {/* Cover Image */}
        <img
          src={anime.coverImage}
          alt={anime.title}
          className="w-18 rounded-md shadow-[0_0_15px_rgba(0,0,0,0.3)] cursor-pointer"
          onClick={handleCardClick}
        />
        <div>
          {/* Title */}
          <div
            className="text-lg font-semibold text-primary text-center cursor-pointer"
            onClick={handleCardClick}
          >
            {anime.title}
          </div>
          <div className="flex items-center max-xs:text-[8px] text-[10px] xs:mt-2">
            {/* Format and Episodes */}
            <div className="flex gap-1 items-center font-medium text-white">
              {anime.format && (
                <span
                  className={`bg-secondary px-2 py-1 pt-[5px] ${
                    anime.episodes ? "rounded-s-md" : "rounded-md"
                  }`}
                >
                  {anime.format}
                </span>
              )}
              {anime.episodes && (
                <span
                  className={`bg-primary px-2 py-1 pt-[5px] ${
                    anime.format ? "rounded-e-md" : "rounded-md"
                  }`}
                >
                  {anime.episodes}
                </span>
              )}
            </div>

            {anime.duration && (
              <GoDotFill className="text-secondary text-md max-xs:mx-1 mx-2" />
            )}

            {/* Episodes Duration */}
            {anime.duration && (
              <div className="text-secondary max-xs:text-[10px] text-[12px]">
                {anime.duration}m
              </div>
            )}
          </div>
        </div>
      </div>

      <div
        className={`h-fit ${isHoverd ? "opacity-100" : "opacity-0"}`}
        onClick={() => handleRemoveClick(anime._id)}
      >
        <MdCancel className="text-secondary text-2xl cursor-pointer hover:text-red-400 hover:scale-120 transition-all duration-200 ease-in-out" />
      </div>
    </div>
  );
}
