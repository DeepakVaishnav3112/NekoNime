import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchAnimeDetails } from "../services/animeService";
import Loader from "../components/Common/Loader";
import BannerImage from "../components/Anime/BannerImage";
import AnimeMainInfo from "../components/Anime/AnimeMainInfo";
import AnimeTabs from "../components/Anime/AnimeTabs";

export default function AnimePage() {
  const [animeDetails, setAnimeDetails] = useState(null);
  const [showMore, setShowMore] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const [selectedTab, setSelectedTab] = useState("Previews");
  const [loading, setLoading] = useState(false);
  const animeId = useParams().id;

  useEffect(() => {
    const loadAnimeDetails = async () => {
      try {
        setLoading(true);
        const res = await fetchAnimeDetails(animeId);
        // console.log(res.data);
        setAnimeDetails(res.data);
      } catch (error) {
        console.log("Error fetching anime details: ", error);
      } finally {
        setLoading(false);
      }
    };

    loadAnimeDetails();
  }, [animeId]);

  useEffect(() => {
    const updateDescriptionPosition = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setShowDescription(true);
      } else {
        setShowDescription(false);
      }
    };

    updateDescriptionPosition();
    window.addEventListener("resize", updateDescriptionPosition);
    return () =>
      window.removeEventListener("resize", updateDescriptionPosition);
  }, []);

  if (!animeDetails) {
    return <Loader />;
  }

  return (
    <div>
      {/* Banner Image */}
      <BannerImage src={animeDetails.bannerImage} />
      {/* <div className="flex flex-col lg:flex-row gap-2 p-4"> */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 p-4">
        {/* Main Info */}
        <AnimeMainInfo
          animeDetails={animeDetails}
          showDescription={showDescription}
          showMore={showMore}
          setShowMore={setShowMore}
        />

        {/* Anime Tabs */}
        <AnimeTabs
          selectedTab={selectedTab}
          handleTabChange={setSelectedTab}
          idMal={animeDetails.idMal}
        />
        {/* <div className="flex-1"></div> */}

        {/* NekoNime Summary Box with Neko Girl Image For Mobile */}
        <div className="flex md:hidden items-center gap-4 grow bg-gradient-to-r from-secondary to-primary-hover-bg shadow mt-6 rounded-md px-3 py-2">
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
            <span className="text-primary font-bold text-xl">NekoNime</span>{" "}
            lets you explore anime, track what you’ve watched, and manage your
            personal lists—all in one cute and simple platform made just for
            anime lovers like you~! 🐾
          </p>
        </div>
      </div>
    </div>
  );
}
