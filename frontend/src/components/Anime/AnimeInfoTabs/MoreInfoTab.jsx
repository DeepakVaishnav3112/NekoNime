import { useEffect, useState } from "react";
import TabHeader from "./TabHeader";
import { fetchAnimeMoreInfo } from "../../../services/animeService";
import Loader from "../../Common/Loader";
import InfoItem from "./InfoItem";

export default function MoreInfoTab({ animeId }) {
  const [moreInfo, setMoreInfo] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadMoreInfo = async () => {
      try {
        setLoading(true);
        const res = await fetchAnimeMoreInfo(animeId);
        setMoreInfo(res.data);
      } catch (error) {
        console.error("Error loading more info:", error);
      } finally {
        setLoading(false);
      }
    };

    loadMoreInfo();
  }, [animeId]);

  const {
    status,
    source,
    startDate,
    endDate,
    nextAiringEpisode,
    favourites,
    studios,
    rankings,
    tags,
    externalLinks,
    hashtag,
    siteUrl,
    isAdult,
    countryOfOrigin,
    episodes,
    duration,
    updatedAt,
  } = moreInfo;

  const formatDate = (date) => {
    if (!date?.year) return "N/A";
    return `${date.day || "??"}-${date.month || "??"}-${date.year}`;
  };

  return (
    <div className="relative px-3">
      <TabHeader heading="More Info" />

      {loading || !moreInfo ? (
        <Loader />
      ) : (
        <div className="h-[400px] overflow-hidden overflow-y-auto custom-scrollbar pr-1 pb-10">
          {/* Status And Source */}
          <div className="text-secondary text-md border-b-2 border-secondary pt-2">
            Status And Source
          </div>
          <div className="w-full flex gap-2 mt-1">
            <InfoItem label="Status" value={status} />
            <InfoItem label="Source" value={source} />
          </div>

          {/* Date And Schedule */}
          <div className="text-secondary text-md border-b-2 border-secondary pt-2">
            Date And Schedule
          </div>
          <div className="w-full flex gap-2 mt-1">
            {startDate && (
              <InfoItem label="Start Date" value={formatDate(startDate)} />
            )}
            {formatDate(endDate) !== "N/A" && (
              <InfoItem label="End Date" value={formatDate(endDate)} />
            )}
            {nextAiringEpisode && (
              <InfoItem
                label="Next Airing Episode"
                value={
                  nextAiringEpisode
                    ? `Ep ${nextAiringEpisode.episode} on ${new Date(
                        nextAiringEpisode.airingAt * 1000
                      ).toLocaleDateString()}`
                    : "Not Scheduled"
                }
              />
            )}
          </div>

          {/* Studios */}
          <div className="text-secondary text-md border-b-2 border-secondary pt-2">
            Studios
          </div>
          <div className="w-full flex gap-2 mt-1">
            <InfoItem
              label="Studios"
              value={
                studios?.nodes?.length
                  ? studios.nodes.map((s) => s.name).join(", ")
                  : "Unknown"
              }
            />
          </div>

          {/* Hashtags */}
          <div className="text-secondary text-md border-b-2 border-secondary pt-2">
            Hashtags
          </div>
          <div className="flex flex-wrap gap-2 items-center mt-1">
            <div className="flex items-center gap-5 bg-primary p-2 rounded-sm text-sm text-white">
              {hashtag}
            </div>
          </div>

          {/* Tags */}
          <div className="text-secondary text-md border-b-2 border-secondary pt-2">
            Tags
          </div>
          <div className="flex flex-wrap gap-2 items-center mt-1">
            {tags?.map((tag) => (
              <div className="flex items-center gap-5 bg-primary p-2 rounded-sm text-sm text-white">
                <span>{tag.name}</span>
                <span className="text-xs text-secondary font-semibold">
                  {tag.rank}%
                </span>
              </div>
            ))}
          </div>

          {/* External Links */}
          <div className="text-secondary text-md border-b-2 border-secondary pt-2">
            External Links
          </div>

          {externalLinks?.length > 0 ? (
            <div className="flex flex-wrap gap-2 items-center mt-1">
              {externalLinks.map((link) => (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={link.type}
                  className="text-sm px-3 py-1 rounded-sm font-medium shadow-md transition-colors duration-300"
                  style={{
                    backgroundColor: link.color || "#429EA6",
                    color: "#fff",
                  }}
                >
                  {link.site}
                </a>
              ))}
            </div>
          ) : (
            <div className="text-sm text-secondary italic mt-1">
              No external links available.
            </div>
          )}

          <div className="mt-1">
            <InfoItem label="Adult Content" value={isAdult ? "Yes 🔞" : "No"} />
          </div>
        </div>
      )}

      <div className="absolute bottom-0 w-full h-10 bg-gradient-to-t from-white to-transparent transition duration-300 pointer-events-none z-10"></div>
    </div>
  );
}
