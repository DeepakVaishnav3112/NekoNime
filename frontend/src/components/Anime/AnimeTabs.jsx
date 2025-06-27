import { useParams } from "react-router-dom";
import Characters from "./AnimeInfoTabs/Characters";
import MusicTab from "./AnimeInfoTabs/MusicTab";
import Previews from "./AnimeInfoTabs/Previews";
import StaffTab from "./AnimeInfoTabs/StaffTab";
import ReviewsTab from "./AnimeInfoTabs/ReviewsTab";
import MoreInfoTab from "./AnimeInfoTabs/MoreInfoTab";

export default function AnimeTabs({ selectedTab, handleTabChange, idMal}) {

  const animeId = parseInt(useParams().id);

  return (
    <div className="flex-1 flex flex-col gap-4 max-lg:mt-4">
      <div className="flex justify-around overflow-hidden overflow-x-auto text-sm font-semibold text-secondary">
        {[
          "Characters",
          "Previews",
          "Music",
          "Staff",
          "Reviews",
          "More Info",
        ].map((tab) => (
          <button
            key={tab}
            onClick={() => handleTabChange(tab)}
            className={`px-3 py-2 transition-all duration-200 ${
              selectedTab === tab
                ? "text-white bg-primary rounded-full"
                : "hover:text-primary"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className=" flex-1 w-full rounded-lg text-black">
        {selectedTab === "Characters" && <Characters animeId={animeId} />}
        {selectedTab === "Previews" && <Previews idMal={idMal} />}
        {selectedTab === "Music" && <MusicTab idMal={idMal} />}
        {selectedTab === "Staff" && <StaffTab animeId={animeId} />}
        {selectedTab === "Reviews" && <ReviewsTab />}
        {selectedTab === "More Info" && <MoreInfoTab animeId={animeId} />}
      </div>
    </div>
  );
}