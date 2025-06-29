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
  

  return (
    <SharedTabContainer heading="Music (Openings & Endings)">
      <div>
        <h3 className="text-secondary text-lg font-semibold border-b-2 border-secondary mt-2">
          Openings
        </h3>
        
      </div>

      <div className="mt-4">
        <h3 className="text-secondary text-lg font-semibold border-b-2 border-secondary">
          Endings
        </h3>
        
      </div>
    </SharedTabContainer>
  );
}
