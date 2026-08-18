import { useState, useRef } from "react";

interface Song {
  title: string;
  videoId: string;
}

const SONGS: Song[] = [
  { title: "Brown Rang", videoId: "MfY9YO3u7GM" },
  { title: "Arcade x Mann Mera", videoId: "-aQMjByEeo8" },
  { title: "God's Plan", videoId: "XUqRem0W8L8" },
  { title: "Love Yourself", videoId: "oyEuk8j8imI" },
  { title: "Let Me Love You", videoId: "euCqAq6BRa4" },
  { title: "No Brainer", videoId: "kxloC1MKTpg" },
  { title: "Not Like Us", videoId: "H58vbez_m4E" },

  { title: "Blue Eyes", videoId: "NbyHNASFi6U" },
  { title: "Dope Shope", videoId: "dHsV56I1GwE" },

  { title: "Tum Se Hi", videoId: "mt9xg0mmt28" },

  { title: "Raabta", videoId: "vEe-UgJvUHE" },
  { title: "Phir Le Aaya Dil", videoId: "k6BnSIs3XUQ" },
  { title: "Tera Ban Jaunga", videoId: "Qdz5n1Xe5Qo" },
  { title: "Pasoori", videoId: "IV_JCpPe3SM" },
  { title: "Apna Bana Le", videoId: "ElZfdU54Cp8" },
  { title: "Tere Sang Yaara", videoId: "gIOea2pgfIo" },
  { title: "Jhol", videoId: "pBLZIYTNrPc" },
  { title: "ROXANNE ", videoId: "16YnOUnbE6s" },
];

const BULLET_COLORS = [
  "text-yellow-500",
  "text-cyan-400",
  "text-blue-400",
  "text-purple-400",
  "text-pink-400",
  "text-orange-400",
];

export const MusicPlayer = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -160 : 160,
      behavior: "smooth",
    });
  };

  const activeSong = activeIndex !== null ? SONGS[activeIndex] : null;

  // View 1: initial bulleted list (before any song is picked)
  if (activeIndex === null) {
    return (
      <div>
        <p className="text-yellow-500 mb-2">🎵 Tracks:</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-1 ml-2">
          {SONGS.map((song, i) => (
            <button
              key={song.title}
              onClick={() => song.videoId && setActiveIndex(i)}
              disabled={!song.videoId}
              className={`text-left ${
                song.videoId
                  ? `${BULLET_COLORS[i % BULLET_COLORS.length]} hover:underline cursor-pointer`
                  : "text-gray-600 cursor-not-allowed"
              }`}
            >
              • {song.title}
            </button>
          ))}
        </div>
        <p className="text-gray-500 text-xs mt-3">
          Click a track to start listening.
        </p>
      </div>
    );
  }

  // View 2: chip row + player (after a song is picked)
  return (
    <div className="max-w-xl">
      <div className="flex items-center gap-2 mb-3">
        <button
          onClick={() => scroll("left")}
          className="text-gray-400 hover:text-white px-1"
          aria-label="Scroll left"
        >
          ◀
        </button>

        <div
          ref={scrollRef}
          className="flex gap-2 overflow-x-auto scrollbar-hide"
        >
          {SONGS.map((song, i) => (
            <button
              key={song.title}
              onClick={() => song.videoId && setActiveIndex(i)}
              disabled={!song.videoId}
              className={`whitespace-nowrap px-3 py-1 rounded-full text-xs border transition-colors ${
                i === activeIndex
                  ? "bg-green-500 text-black border-green-500"
                  : song.videoId
                    ? "border-gray-600 text-gray-300 hover:border-green-500 hover:text-green-400"
                    : "border-gray-800 text-gray-600 cursor-not-allowed"
              }`}
            >
              {i === activeIndex ? "▶ " : ""}
              {song.title}
            </button>
          ))}
        </div>

        <button
          onClick={() => scroll("right")}
          className="text-gray-400 hover:text-white px-1"
          aria-label="Scroll right"
        >
          ▶
        </button>
      </div>

      {activeSong && (
        <iframe
          key={activeSong.videoId}
          style={{ borderRadius: "12px" }}
          width="100%"
          height="200"
          src={`https://www.youtube.com/embed/${activeSong.videoId}?autoplay=1`}
          title={activeSong.title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
        />
      )}
    </div>
  );
};
