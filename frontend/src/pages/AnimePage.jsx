import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchAnimeDetails } from "../services/animeService";
import Loader from "../components/Common/Loader";

export default function AnimePage() {
  const [animeDetails, setAnimeDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const animeId = useParams().id;
  // console.log(animeId);

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

  if (!animeDetails) {
    return <Loader />;
  }

  return (
    <div className="flex px-2 py-3">
      
    </div>
  );
}
