import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { useState } from "react";
import AnimeInfoHeader from "../Anime/AnimePage/AnimeMainInfo/AnimeInfoHeader";
import Loader from "./Loader";
import { FaArrowLeft, FaArrowRight, FaBookmark } from "react-icons/fa";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { Link } from "react-router-dom";
import AnimeDescription from "../Anime/AnimePage/AnimeMainInfo/AnimeDescription";
import { FaRegBookmark } from "react-icons/fa6";
import { useEffect } from "react";

export default function AnimeCarousel({ animeList, loading }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSaved, setIsSaved] = useState(false);
  const [progress, setProgress] = useState(0);

  const carouselAnime = animeList
    ?.filter((anime) => {
      if (anime.bannerImage) return true;
    })
    .slice(0, 10);
  // console.log(trending);
  // console.log(carouselAnime);

  const goToNext = () => {
    setCurrentIndex((prev) =>
      prev === carouselAnime.length - 1 ? 0 : prev + 1
    );
  };

  const goToPrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? carouselAnime.length - 1 : prev - 1
    );
  };

  useEffect(() => {
    const intervalTime = 8000;
    let startTime = Date.now();

    const interval = setInterval(() => {
      const now = Date.now();
      const elapsedTime = now - startTime;
      const percent = (elapsedTime / intervalTime) * 100;

      if (percent >= 100) {
        setCurrentIndex((prev) =>
          prev === carouselAnime.length - 1 ? 0 : prev + 1
        );
        startTime = Date.now(); // reset timer
        setProgress(0);
      } else {
        setProgress(percent);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [currentIndex, carouselAnime?.length]);

  if (!animeList) return <Loader />;

  return (
    <div className="relative w-full mx-auto overflow-hidden">
      <div
        className="flex transition-transform duration-200"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {carouselAnime.map((anime, idx) => (
          <div key={anime.id} className="relative w-full shrink-0 flex">
            <div className="w-[20%] h-full"></div>
            {/* Carrousel Anime Image */}
            <div className="w-[80%] relative">
              <img
                src={anime.bannerImage || anime.coverImage.large}
                alt={anime.title.english || anime.title.romaji}
                className="object-cover w-full h-full"
              />

              <div className="absolute top-0 left-[-1px] w-[20%] h-full bg-gradient-to-r from-white via-white/70 to-transparent z-10"></div>
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-white via-white/10 to-transparent z-10"></div>
              <div className="absolute bottom-0 w-full h-15 bg-gradient-to-t from-white to-transparent z-20"></div>
            </div>

            {/* Carrousel Anime Info */}
            <div className="absolute bottom-40 z-20 m-10 flex flex-col gap-4 max-w-[250px] md:max-w-[500px]">
              <span className="text-sm md:text-xl font-semibold text-secondary">
                #{idx + 1} Spotlight
              </span>
              <AnimeInfoHeader animeDetails={anime} isBig={true} />
              <div className="hidden md:block">
                <AnimeDescription
                  description={anime.description}
                  isExapandable={false}
                />
              </div>

              {/* Carrousel Anime Action Buttons */}
              <div className="flex items-center gap-2">
                {/* Save Button */}
                <div
                  className={`p-2 border-3  ${
                    isSaved
                      ? "bg-primary border-primary text-white hover:bg-secondary hover:border-secondary hover:text-white"
                      : "border-secondary text-secondary hover:bg-primary hover:border-primary hover:text-white"
                  } rounded-sm cursor-pointer transition hover:scale-110 duration-200`}
                  onClick={() => setIsSaved(!isSaved)}
                >
                  {isSaved ? (
                    <FaBookmark className="text-[22px]" />
                  ) : (
                    <FaRegBookmark className="text-[22px]" />
                  )}
                </div>

                {/* Details Button */}
                <Link to={`/anime/${anime.id}`} className="w-fit">
                  <div className="group flex items-center bg-secondary w-fit px-4 py-2 text-primary-hover-text text-xl rounded-s-md rounded-e-full cursor-pointer hover:bg-primary hover:text-lg hover:text-white hover:rounded-full transition-all duration-200">
                    <span>Details</span>
                    <IoIosArrowDroprightCircle className="text-2xl font-extrabold ml-2 mt-[2px] group-hover:scale-110 transition duration-200" />
                  </div>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Carousel Navigation Buttons */}
      <div className="absolute bottom-[52%] translate-y-[100%] right-0 mx-5 mb-10 flex flex-col gap-2 text-primary-hover-text">
        <button
          onClick={goToPrev}
          className="bg-secondary hover:bg-primary hover:text-white hover:scale-110 rounded-md p-3 shadow-md cursor-pointer transition duration-200"
        >
          <FaArrowLeft className="text-2xl font-extrabold" />
        </button>

        <button
          onClick={goToNext}
          className="bg-secondary hover:bg-primary hover:text-white hover:scale-110 rounded-md p-3 shadow-md cursor-pointer transition duration-200"
        >
          <FaArrowRight className="text-2xl font-extrabold" />
        </button>
      </div>

      {/* Carrousel Slider indicators */}
      <div className="absolute bottom-42 left-10 z-20 flex gap-2">
        {carouselAnime.map((_, idx) => (
          <div
            key={idx}
            className={`group h-2 flex rounded-full bg-secondary hover:bg-primary cursor-pointer transition-all duration-200 ${
              idx === currentIndex ? "w-16" : "w-6"
            }`}
            onClick={() => setCurrentIndex(idx)}
          >
            <div
              className={`h-full rounded-full group-hover:bg-primary transition-all duration-200 ${
                idx === currentIndex ? "bg-primary" : "bg-transparent"
              }`}
              style={{ width: idx === currentIndex ? `${progress}%` : "0%" }}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
}
