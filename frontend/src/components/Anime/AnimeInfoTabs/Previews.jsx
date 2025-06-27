import { useEffect, useState } from "react";
import TabHeader from "./TabHeader";
import axios from "axios";
import Loader from "../../Common/Loader";

export default function Previews({ idMal }) {
  const [promoAndImages, setPromoAndImages] = useState();
  const promoAndImagesAPI = `https://api.jikan.moe/v4/anime/${idMal}/videos`;
  console.log(idMal)

  useEffect(() => {
    const loadAnimePromoAndImages = async () => {
      try {
        const res = await axios.get(promoAndImagesAPI);
        // console.log(res.data.data);
        setPromoAndImages(res.data.data);
      } catch (error) {
        console.log("Error fetching images: ", error);
      }
    };

    if (idMal) loadAnimePromoAndImages();
  }, [idMal]);

  if (!promoAndImages) return <Loader />;

  return (
    <div className="relative px-3">
      <TabHeader heading="Previews (Trailers and Screenshots)" />

      {promoAndImages && (
        <div className="h-[400px] overflow-hidden overflow-y-auto custom-scrollbar pr-1 pb-10 space-y-4">
          {/* Promo Videos */}
          {promoAndImages.promo.map((item) => (
            <div
              key={item.trailer.youtube_id}
              className="w-full aspect-video rounded-xl overflow-hidden shadow-lg mt-1"
            >
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${item.trailer.youtube_id}`}
                title={item.title}
                allow="autoplay; encrypted-media"
                allowFullScreen
              ></iframe>
            </div>
          ))}

          {/* Screenshots Heading */}
          <div className="text-secondary text-lg border-b-2 border-secondary pt-2">
            Screenshots
          </div>

          {/* Episode Screenshots */}
          <div className="grid grid-cols-3 gap-4">
            {promoAndImages.episodes.map((item) => (
              <div key={item.mal_id} className="flex items-center justify-center">
                <img
                  src={item.images.jpg.image_url}
                  alt={item.title}
                  className="shadow-md rounded-md"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="absolute bottom-0 w-full h-10 bg-gradient-to-t from-white to-transparent transition duration-300 pointer-events-none z-10"></div>
    </div>
  );
}
