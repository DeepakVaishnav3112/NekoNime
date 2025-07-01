import React from "react";
import { Link } from "react-router-dom";

export default function RelatedAnimeCard({ relation }) {
  return (
    <div className="snap-center snap-always w-[160px]">
      <a href={`/anime/${relation.node.id}`}>
      <img
        src={relation.node.coverImage.large}
        alt={relation.node.title.english || relation.node.title.romaji}
        className="w-full h-[220px] object-cover rounded-md shadow-lg cursor-pointer"
      />
      </a>
      <div className="mt-1">
        <h3
          title={relation.node.title.english || relation.node.title.romaji}
          className="text-sm font-semibold text-primary overflow-hidden whitespace-nowrap text-ellipsis cursor-pointer"
        >
          {relation.node.title.english || relation.node.title.romaji}
        </h3>
        <div className="flex gap-1 items-center font-medium text-white text-[8px] mt-[2px]">
          {/* Format and Episodes */}
          {relation.node.format && (
            <span
              className={`bg-secondary px-2 py-1 pt-[4px] ${
                relation.node.episodes ? "rounded-s-md" : "rounded-md"
              }`}
            >
              {relation.node.format}
            </span>
          )}
          {relation.node.episodes && (
            <span
              className={`bg-primary px-2 py-1 pt-[4px] ${
                relation.node.format ? "rounded-e-md" : "rounded-md"
              }`}
            >
              {relation.node.episodes}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
