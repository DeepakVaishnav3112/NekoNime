import { useEffect, useState } from "react";
import TabHeader from "./TabHeader";
import { fetchAnimeStaff } from "../../../services/animeService";
import Loader from "../../Common/Loader";

export default function StaffTab({ animeId }) {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadStaffData = async () => {
      try {
        setLoading(true);
        const res = await fetchAnimeStaff(animeId);
        console.log(res.data);
        setStaff(res.data);
      } catch (error) {
        console.log("Error fetching staff: ", error);
      } finally {
        setLoading(false);
      }
    };

    loadStaffData();
  }, [animeId]);

  return (
    <div className="relative px-3">
      <TabHeader heading="Staff" />

      {!staff || loading ? (
        <Loader />
      ) : (
        <div className="grid max-sm:grid-cols-1 max-lg:grid-cols-2 xl:grid-cols-2 gap-2 h-[400px] overflow-hidden overflow-y-auto custom-scrollbar pr-1 pb-10 mt-1">
          {staff.map((item) => (
            <div
              key={item.node.id}
              className="h-20 flex gap-2 bg-primary-hover-bg rounded-md"
            >
              <img
                src={item.node.image.large}
                alt={item.role}
                className="h-full rounded-l-md"
              />
              <div className="flex flex-col mt-2">
                <span className="text-white text-sm font-light">
                  {item.node.name.full}
                </span>
                <span className="text-primary-hover-text text-xs font-extralight">
                  {item.role}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="absolute bottom-0 w-full h-10 bg-gradient-to-t from-white to-transparent transition duration-300 pointer-events-none z-10"></div>
    </div>
  );
}
