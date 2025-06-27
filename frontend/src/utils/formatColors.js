import {
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaPauseCircle,
  FaQuestionCircle,
  FaBroadcastTower,
  FaBook,
  FaTv,
  FaFilm,
  FaFeatherAlt,
  FaGamepad,
  FaRegQuestionCircle,
  FaPlay, FaStop
} from "react-icons/fa";
import { GiScrollUnfurled } from "react-icons/gi";
import { MdOutlineAutoStories } from "react-icons/md";

export const genreColorsMap = {
  Action: "#FF6B6B",
  Adventure: "#4ECDC4",
  Comedy: "#FFE66D",
  Drama: "#A29BFE",
  Ecchi: "#FFB6C1",
  Fantasy: "#6C5CE7",
  Hentai: "#FF3F34",
  Horror: "#2D3436",
  "Mahou Shoujo": "#FD79A8",
  Mecha: "#00CEC9",
  Music: "#74B9FF",
  Mystery: "#636E72",
  Psychological: "#E17055",
  Romance: "#FAB1A0",
  "Sci-Fi": "#55EFC4",
  "Slice of Life": "#81ECEC",
  Sports: "#00B894",
  Supernatural: "#9980FA",
  Thriller: "#D63031",
  Shonen: "#FDCB6E",
};

export const genreTextColorsMap = {
  Action: "#fff",
  Adventure: "#000",
  Comedy: "#000",
  Drama: "#fff",
  Ecchi: "#000",
  Fantasy: "#fff",
  Hentai: "#fff",
  Horror: "#fff",
  "Mahou Shoujo": "#000",
  Mecha: "#000",
  Music: "#000",
  Mystery: "#fff",
  Psychological: "#000",
  Romance: "#000",
  "Sci-Fi": "#000",
  "Slice of Life": "#000",
  Sports: "#fff",
  Supernatural: "#fff",
  Thriller: "#fff",
  Shonen: "#000",
};

export const formatColors = {
  TV: "#4CAF50", // Green
  MOVIE: "#2196F3", // Blue
  OVA: "#FF9800", // Orange
  ONA: "#9C27B0", // Purple
  SPECIAL: "#E91E63", // Pink
  MUSIC: "#795548", // Brown
};

export const statusStylesMap = {
  FINISHED: {
    label: "Finished",
    gradient: "from-green-400 to-green-600",
    textColor: "text-white",
    icon: FaCheckCircle,
  },
  RELEASING: {
    label: "Releasing",
    gradient: "from-blue-400 to-blue-600",
    textColor: "text-white",
    icon: FaBroadcastTower,
  },
  NOT_YET_RELEASED: {
    label: "Not Yet Released",
    gradient: "from-yellow-400 to-orange-500",
    textColor: "text-black",
    icon: FaClock,
  },
  CANCELLED: {
    label: "Cancelled",
    gradient: "from-red-400 to-red-600",
    textColor: "text-white",
    icon: FaTimesCircle,
  },
  HIATUS: {
    label: "Hiatus",
    gradient: "from-purple-400 to-purple-600",
    textColor: "text-white",
    icon: FaPauseCircle,
  },
  UNKNOWN: {
    label: "Unknown",
    gradient: "from-gray-400 to-gray-500",
    textColor: "text-white",
    icon: FaQuestionCircle,
  },
};

export const sourceStylesMap = {
  MANGA: {
    label: "Manga",
    gradient: "from-pink-400 to-pink-600",
    textColor: "text-white",
    icon: FaBook,
  },
  LIGHT_NOVEL: {
    label: "Light Novel",
    gradient: "from-violet-400 to-violet-600",
    textColor: "text-white",
    icon: MdOutlineAutoStories,
  },
  VISUAL_NOVEL: {
    label: "Visual Novel",
    gradient: "from-cyan-400 to-cyan-600",
    textColor: "text-black",
    icon: FaFeatherAlt,
  },
  ORIGINAL: {
    label: "Original",
    gradient: "from-blue-400 to-indigo-500",
    textColor: "text-white",
    icon: FaTv,
  },
  VIDEO_GAME: {
    label: "Video Game",
    gradient: "from-green-400 to-emerald-600",
    textColor: "text-white",
    icon: FaGamepad,
  },
  OTHER: {
    label: "Other",
    gradient: "from-gray-400 to-gray-500",
    textColor: "text-white",
    icon: GiScrollUnfurled,
  },
  NOVEL: {
    label: "Novel",
    gradient: "from-yellow-400 to-amber-500",
    textColor: "text-black",
    icon: FaBook,
  },
  WEB_MANGA: {
    label: "Web Manga",
    gradient: "from-rose-400 to-rose-600",
    textColor: "text-white",
    icon: FaBook,
  },
  MULTIMEDIA_PROJECT: {
    label: "Multimedia",
    gradient: "from-fuchsia-400 to-fuchsia-600",
    textColor: "text-white",
    icon: FaFilm,
  },
  UNKNOWN: {
    label: "Unknown",
    gradient: "from-zinc-400 to-zinc-500",
    textColor: "text-white",
    icon: FaRegQuestionCircle,
  },
};

export const dateStylesMap = {
  startDate: {
    label: "Start Date",
    gradient: "from-green-400 to-teal-500",
    textColor: "text-white",
    icon: FaPlay,
  },
  endDate: {
    label: "End Date",
    gradient: "from-red-400 to-rose-500",
    textColor: "text-white",
    icon: FaStop,
  },
  nextAiringEpisode: {
    label: "Next Airing Episode",
    gradient: "from-blue-500 to-indigo-600",
    textColor: "text-white",
    icon: FaClock,
  },
};

