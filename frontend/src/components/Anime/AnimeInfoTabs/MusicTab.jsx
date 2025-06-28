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
  const [videoIds, setVideoIds] = useState({});

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

  const cleanQuery = (theme) => {
    return theme
      .replace(/["']/g, "") // remove quotes
      .replace(/\([^)]*\)/g, "") // remove (stuff)
      .replace(/【[^】]*】/g, "") // remove 【stuff】
      .replace(/CV:[^,)]*/g, "") // remove CV: person
      .replace(/\d+:/g, "") // remove "1:", "2:"
      .replace(/\s+by.+$/i, "") // remove "by artist"
      .replace(/\s+/g, " ") // collapse spaces
      .trim();
  };

  useEffect(() => {
    if (!Array.isArray(openings) || !Array.isArray(endings)) return;

    const fetchVideoIds = async () => {
      const allThemes = [
        ...openings.map((o) => `${cleanQuery(o)} opening`),
        ...endings.map((e) => `${cleanQuery(e)} ending`),
      ];
      const ids = {};

      for (const theme of allThemes) {
        try {
          const res = await fetchAnimeMusic(theme);
          if (res.data && res.data.id && res.data.id.videoId) {
            ids[theme] = res.data.id.videoId;
          } else {
            console.warn(`No video ID found for: ${theme}`);
            ids[theme] = null;
          }
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
    <SharedTabContainer heading="Music (Openings & Endings)">
      <div>
        <h3 className="text-secondary text-lg font-semibold border-b-2 border-secondary mt-2">
          Openings
        </h3>
        {openings.length > 0 ? (
          openings.map((op, idx) => renderYouTubeVideo(`${op} opening`, idx))
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
    </SharedTabContainer>
  );
}
