import { useState, useRef } from "react";

interface Song {
  title: string;
  videoId: string;
}

// Fill in the videoId for each song below — see instructions after the code.
const SONGS: Song[] = [
  { title: "Woh Lamhe Woh Baatein", videoId: "wTZapoGmVnU" },
  { title: "Chahun Main Ya Naa", videoId: "" },
  { title: "Tum Hi Ho", videoId: "" },
  { title: "Tu Jaane Na", videoId: "" },
  { title: "Samjhawan", videoId: "" },
  { title: "Baaton Ko Teri", videoId: "" },
  { title: "Tum Gye Ho Kyun", videoId: "" },
  { title: "Khamoshiyan", videoId: "" },
];

export const MusicPlayer = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -160 : 160,
      behavior: "smooth",
    });
  };

  const activeSong = SONGS[activeIndex];

  return (
    <div className="max-w-xl">
      <div className="flex items-center gap-2 mb-2">
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
              onClick={() => setActiveIndex(i)}
              disabled={!song.videoId}
              className={`whitespace-nowrap px-3 py-1 rounded-full text-xs border transition-colors ${
                i === activeIndex
                  ? "bg-green-500 text-black border-green-500"
                  : song.videoId
                    ? "border-gray-600 text-gray-300 hover:border-green-500 hover:text-green-400"
                    : "border-gray-800 text-gray-600 cursor-not-allowed"
              }`}
            >
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

      {activeSong.videoId ? (
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
      ) : (
        <p className="text-gray-500 text-sm">This track isn't linked up yet.</p>
      )}s
    </div>
  );
};
