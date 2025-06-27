import { GoDotFill } from "react-icons/go";
import { formatAnimeDate } from "../../utils/dateUtils";

export default function AnimeInfoHeader({
  title,
  altTitle,
  format,
  episodes,
  duration,
  startDate,
}) {
  return (
    <>
      <div>
        <h1 className="text-primary max-xl:text-lg text-xl font-bold leading-5">
          {title}
        </h1>
        <span className="text-[10px] sm:text-xs text-primary-hover-bg">{altTitle}</span>

        <div className="flex items-center text-[10px] mt-2">
          {/* Format and Episodes */}
          <div className="flex gap-1 items-center font-medium text-white">
            {format && (
              <span
                className={`bg-secondary px-2 py-1 pt-[5px] ${
                  episodes ? "rounded-s-md" : "rounded-md"
                }`}
              >
                {format}
              </span>
            )}
            {episodes && (
              <span
                className={`bg-primary px-2 py-1 pt-[5px] ${
                  format ? "rounded-e-md" : "rounded-md"
                }`}
              >
                {episodes}
              </span>
            )}
          </div>

          {duration && <GoDotFill className="text-secondary text-md mx-2" />}

          {/* Episodes Duration */}
          {duration && (
            <div className="text-secondary text-[12px]">{duration}m</div>
          )}

          {startDate && <GoDotFill className="text-secondary text-md mx-2" />}

          {/* Release Date */}
          {startDate && (
            <div className="text-secondary text-[12px]">
              {formatAnimeDate(startDate)}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
