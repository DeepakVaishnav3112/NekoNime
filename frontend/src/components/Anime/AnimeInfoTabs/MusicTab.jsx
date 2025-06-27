import { useEffect, useState } from "react";
import TabHeader from "./TabHeader";
import axios from "axios";

const YOUTUBE_API_KEY = "AIzaSyAb855V-6KCbX-sXp8QwPPXhr1r4GxHkzQ"; // Replace with your real API key

export default function MusicTab({ idMal }) {
  const [openings, setOpenings] = useState([]);
  const [endings, setEndings] = useState([]);
  const [videoIds, setVideoIds] = useState({}); // Store fetched video IDs

  useEffect(() => {
    const fetchMusic = async () => {
      try {
        const res = await axios.get(
          `https://api.jikan.moe/v4/anime/${idMal}/themes`
        );
        const { openings, endings } = res.data.data;
        setOpenings(openings || []);
        setEndings(endings || []);
      } catch (err) {
        console.error("Error fetching music themes:", err);
      }
    };

    if (idMal) fetchMusic();
  }, [idMal]);

  useEffect(() => {
    const fetchVideoIds = async () => {
      const allThemes = [...openings.map(o => `${o} opening`), ...endings.map(e => `${e} ending`)];
      const ids = {};

      for (const theme of allThemes) {
        try {
          const res = await axios.get("https://www.googleapis.com/youtube/v3/search", {
            params: {
              part: "snippet",
              q: theme,
              key: YOUTUBE_API_KEY,
              maxResults: 1,
              type: "video"
            }
          });
          ids[theme] = res.data.items[0]?.id.videoId || null;
        } catch (error) {
          console.error(`Error fetching video for ${theme}:`, error);
          ids[theme] = null;
        }
      }

      setVideoIds(ids);
    };

    if (openings.length || endings.length) fetchVideoIds();
  }, [openings, endings]);

  const renderYouTubeVideo = (query, index) => {
    const videoId = videoIds[query];
    if (!videoId) return null;

    return (
      <div
        key={index}
        className="w-full aspect-video rounded-xl overflow-hidden shadow-md mt-3"
      >
        <iframe
          className="w-full h-full"
          src={`https://www.youtube.com/embed/${videoId}`}
          title={query}
          allow="autoplay; encrypted-media"
          allowFullScreen
        ></iframe>
      </div>
    );
  };

  return (
    <div className="px-3">
      <TabHeader heading="Music (Openings & Endings)" />

      <div className="h-[400px] overflow-y-auto custom-scrollbar pr-1 pb-10">
        <div>
          <h3 className="text-secondary text-lg font-semibold border-b-2 border-secondary mt-2">
            Openings
          </h3>
          {openings.length > 0 ? (
            openings.map((op, idx) =>
              renderYouTubeVideo(`${op} opening`, idx)
            )
          ) : (
            <p className="text-sm text-secondary mt-1">No openings found.</p>
          )}
        </div>

        <div className="mt-4">
          <h3 className="text-secondary text-lg font-semibold border-b-2 border-secondary">
            Endings
          </h3>
          {endings.length > 0 ? (
            endings.map((ed, idx) =>
              renderYouTubeVideo(`${ed} ending`, idx + openings.length)
            )
          ) : (
            <p className="text-sm text-secondary mt-1">No endings found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
