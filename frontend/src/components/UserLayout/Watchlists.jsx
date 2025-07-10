import { useEffect, useState } from "react";
import { defaultListSections } from "../../utils/sections";
import { getDefaultListEntries } from "../../services/listService";
import Loader from "../Common/Loader";
import { GoDotFill } from "react-icons/go";
import ListEntryCard from "./ListEntryCard";
import { useMemo } from "react";
import { FaSearch } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import ListEntryCardSkeleton from "../Loaders/ListEntryCardSkeleton";

export default function Watchlists() {
  const [selectedDefaulList, setSelectedDefaultList] = useState("completed");
  const [entries, setEntries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Filter States
  const [searchTerm, setSearchTerm] = useState("");
  const [formatFilter, setFormatFilter] = useState("all");
  const [episodeFilter, setEpisodeFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("az");

  useEffect(() => {
    const fetchListEntries = async () => {
      setIsLoading(true);
      try {
        const res = await getDefaultListEntries(selectedDefaulList);
        setEntries(res.data.listEntries || []);
        console.log(res.data);
      } catch (err) {
        console.error("Failed to fetch list entries:", err);
        setEntries([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchListEntries();
  }, [selectedDefaulList]);

  const handleRemove = (removeId) => {
    setEntries((prev) => prev.filter((entry) => entry._id !== removeId));
  };

  const filteredEntries = useMemo(() => {
    return entries
      .filter((anime) =>
        anime.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter((anime) =>
        formatFilter === "all" ? true : anime.format === formatFilter
      )
      .filter((anime) => {
        if (episodeFilter === "short") return anime.episodes <= 12;
        if (episodeFilter === "medium")
          return anime.episodes > 12 && anime.episodes <= 24;
        if (episodeFilter === "long") return anime.episodes > 24;
        return true;
      })
      .sort((a, b) => {
        if (sortOrder === "az") return a.title.localeCompare(b.title);
        if (sortOrder === "za") return b.title.localeCompare(a.title);
        return 0;
      });
  }, [entries, searchTerm, formatFilter, episodeFilter, sortOrder]);

  const uniqueFormats = [
    ...new Set(entries.map((e) => e.format).filter(Boolean)),
  ];

  return (
    <div className="relative flex flex-col lg:flex-row w-fit mx-auto justify-center gap-4">
      {/* List Filter Section */}
      <ListFilterSection
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filteredEntries={filteredEntries}
        formatFilter={formatFilter}
        setFormatFilter={setFormatFilter}
        episodeFilter={episodeFilter}
        setEpisodeFilter={setEpisodeFilter}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        uniqueFormats={uniqueFormats}
      />

      {/* List Section */}
      <div className="relative flex flex-col items-center">
        {/* Default List Navigation */}
        <div className="fixed flex gap-4 m-2">
          {defaultListSections.map(({ status, Icon }) => {
            const listKey = status
              .toLowerCase()
              .replace("plan to watch", "planToWatch");

            return (
              <button
                key={status}
                onClick={() => setSelectedDefaultList(listKey)}
                className={`group flex justify-between items-center text-white rounded-md border-b-3 border-transparent  px-4 py-2 cursor-pointer text-sm transition-all duration-200 ease-in-out ${
                  selectedDefaulList === listKey
                    ? "bg-primary"
                    : "bg-secondary hover:bg-transparent hover:text-secondary hover:border-secondary hover:rounded-none"
                }`}
              >
                <span className="flex items-center gap-2">
                  <Icon className="text-lg" />
                  {status}
                </span>
              </button>
            );
          })}
        </div>

        {/* Default Lists Entries */}
        <div className="mt-15 mb-5 w-xl">
          {isLoading ? (
            <div className="flex flex-col gap-2 px-2 w-full">
              {Array(3)
                .fill(0)
                .map((_, idx) => (
                  <ListEntryCardSkeleton key={idx} />
                ))}
            </div>
          ) : filteredEntries?.length === 0 ? (
            <p className="text-gray-500 px-2 w-full text-center">
              No anime found in {selectedDefaulList} list.
            </p>
          ) : (
            <div className="flex flex-col gap-2 px-2 w-full">
              {filteredEntries.map((anime) => (
                <ListEntryCard
                  key={anime.animeId}
                  anime={anime}
                  onRemove={handleRemove}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ListFilterSection({
  searchTerm,
  setSearchTerm,
  filteredEntries,
  formatFilter,
  setFormatFilter,
  uniqueFormats,
  episodeFilter,
  setEpisodeFilter,
  sortOrder,
  setSortOrder,
}) {
  return (
    <>
      {/* List Filters and Stats */}
      <div className="sticky top-[132px] h-fit flex flex-col gap-2 mt-2">
        <div className="flex items-center justify-between rounded-full border-2 border-secondary/20">
          {/* Search Anime by name */}
          <input
            type="text"
            value={searchTerm}
            placeholder="Search by name..."
            onChange={(e) => setSearchTerm(e.target.value)}
            className="grow outline-0 ps-4"
          />
          <span className="p-3">
            <FaSearch className="text-secondary" />
          </span>
        </div>

        {/* Total anime count in list */}
        <div className="px-4 py-2 border-2 border-secondary/20 rounded-md">
          <div className="flex justify-between items-center">
            <span className="text-lg text-primary">Total Anime</span>{" "}
            <FaArrowRightLong className="text-primary" />{" "}
            <span className="px-3 py-1 text-white bg-primary rounded-full">
              {filteredEntries.length}
            </span>
          </div>
        </div>

        <div className="px-4 py-2 border-2 border-secondary/20 rounded-md">
          <div className="mt-2 flex flex-col gap-2">
            {/* Format filter */}
            <div className="text-secondary font-semibold text-lg">Format</div>
            <select
              value={formatFilter}
              onChange={(e) => setFormatFilter(e.target.value)}
              className="w-full bg-primary text-white p-2 rounded-md outline-none cursor-pointer"
            >
              <option value="all">All Formats</option>
              {uniqueFormats.map((f) => (
                <option key={f} value={f}>
                  {f}
                </option>
              ))}
            </select>

            {/* Episode count filter */}
            <div className="text-secondary font-semibold text-lg">Episodes</div>
            <select
              value={episodeFilter}
              onChange={(e) => setEpisodeFilter(e.target.value)}
              className="w-full bg-primary text-white p-2 rounded-md outline-none cursor-pointer"
            >
              <option value="all">All Episodes</option>
              <option value="short">≤ 12</option>
              <option value="medium">13–24</option>
              <option value="long"> 24</option>
            </select>

            {/* Sort Order */}
            <div className="text-secondary font-semibold text-lg">Sort</div>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="w-full bg-primary text-white p-2 rounded-md outline-none cursor-pointer"
            >
              <option value="az">A → Z</option>
              <option value="za">Z → A</option>
            </select>
          </div>
        </div>
      </div>
    </>
  );
}
