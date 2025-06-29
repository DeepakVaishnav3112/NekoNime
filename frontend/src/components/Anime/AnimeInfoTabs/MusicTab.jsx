import { useEffect, useState } from "react";
import axios from "axios";
import SharedTabContainer from "./SharedTabContainer";
import { fetchAnimeMusic } from "../../../services/animeService";

export default function MusicTab({
  idMal,
  openings,
  setOpenings,
  endings,
  setEndings,
}) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchThemesAndVideos = async () => {
      try {
        // Step 1: Get themes (openings and endings) from Jikan
        const jikanRes = await axios.get(
          `https://api.jikan.moe/v4/anime/${idMal}/themes`
        );
        const data = jikanRes.data?.data;

        const openingTitles = data?.openings || [];
        const endingTitles = data?.endings || [];

        setOpenings(openingTitles);
        setEndings(endingTitles);

        // Step 2: Fetch YouTube videos for each title
        const fetchYouTubeVideo = async (title) => {
          try {
            const res = await fetchAnimeMusic(title);
            return res.data;
          } catch (err) {
            console.error("YouTube video fetch error:", err);
            return null;
          }
        };

        const openingResults = await Promise.all(
          openingTitles.map((title) => fetchYouTubeVideo(title))
        );

        const endingResults = await Promise.all(
          endingTitles.map((title) => fetchYouTubeVideo(title))
        );

        setOpenings(
          openingTitles.map((title, idx) => ({
            title,
            video: openingResults[idx],
          }))
        );

        setEndings(
          endingTitles.map((title, idx) => ({
            title,
            video: endingResults[idx],
          }))
        );
      } catch (err) {
        console.error("Failed to fetch anime music themes:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchThemesAndVideos();
  }, [idMal]);

  return (
    <SharedTabContainer heading="Music (Openings & Endings)">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 2xl:grid-cols-2 gap-4">
      <div>
        <h3 className="text-secondary text-lg font-semibold border-b-2 border-secondary">
          Openings
        </h3>
        {loading ? (
          <p className="text-secondary">Loading...</p>
        ) : openings.length === 0 ? (
          <p className="text-secondary">No opening themes found.</p>
        ) : (
          openings.map((op, idx) => (
            <div key={idx} className="my-4">
              {op.video && (
                <iframe
                  className="w-full aspect-video rounded-md"
                  src={`https://www.youtube.com/embed/${op.video.id.videoId}`}
                  title={op.title}
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                ></iframe>
              )}
            </div>
          ))
        )}
      </div>

      <div className="">
        <h3 className="text-secondary text-lg font-semibold border-b-2 border-secondary">
          Endings
        </h3>
        {loading ? (
          <p className="text-secondary">Loading...</p>
        ) : endings.length === 0 ? (
          <p className="text-secondary">No ending themes found.</p>
        ) : (
          endings.map((ed, idx) => (
            <div key={idx} className="my-4">
              {ed.video && (
                <iframe
                  className="w-full aspect-video rounded-md"
                  src={`https://www.youtube.com/embed/${ed.video.id.videoId}`}
                  title={ed.title}
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                ></iframe>
              )}
            </div>
          ))
        )}
      </div>
      </div>
    </SharedTabContainer>
  );
}
