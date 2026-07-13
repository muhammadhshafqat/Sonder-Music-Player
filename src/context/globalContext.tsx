import React, { Children, createContext, useContext, useState } from "react";

const preset = [
  {
    id: 1,
    title: "Love You Less",
    artist: "Joji",
    url: "/tracks/Joji - Love You Less.mp3",
    cover: "",
  },
  {
    id: 2,
    title: "Caramel",
    artist: "Sleep Token",
    url: "/tracks/Sleep Token - Caramel.mp3",
    cover: "",
  },
  {
    id: 3,
    title: "Dracula",
    artist: "Tame Impala",
    url: "/tracks/Tame Impala - Dracula.mp3",
    cover: "",
  },
];

type track = {
  id: number;
  title: string;
  artist: string;
  url: string;
  cover: string;
};
type GlobalContextType = {
  alltracks: track[];
  setalltracks: React.Dispatch<React.SetStateAction<track[]>>;

  currentTrack: track;
  setcurrentTrack: React.Dispatch<React.SetStateAction<track>>;

  currentTrackIndex: number;
  setcurrentTrackIndex: React.Dispatch<React.SetStateAction<number>>;

  currentTime: number;
  setcurrentTime: React.Dispatch<React.SetStateAction<number>>;

  duration: number;
  setduration: React.Dispatch<React.SetStateAction<number>>;

  isPlaying: boolean;
  setisPlaying: React.Dispatch<React.SetStateAction<boolean>>;

  volume: number;
  setvolume: React.Dispatch<React.SetStateAction<number>>;
  play: () => void;
  pause: () => void;
  nexttrack: () => void;
  prevtrack: () => void;
  formattime: (time: number) => string;
  handleplaysong: (song: track, index: number) => void;
};

export const GlobalContext = createContext<GlobalContextType | null>(null);

export function ContextProvider({ children }: { children: React.ReactNode }) {
  const [alltracks, setalltracks] = useState(preset);
  const [currentTrack, setcurrentTrack] = useState(alltracks[0]);
  const [currentTrackIndex, setcurrentTrackIndex] = useState(0);
  const [currentTime, setcurrentTime] = useState(0);
  const [duration, setduration] = useState(0);
  const [isPlaying, setisPlaying] = useState(false);
  const [volume, setvolume] = useState(0.5);
  const formattime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const mins = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${mins}:${seconds.toString().padStart(2, "0")}`;
  };

  const play = () => {
    setisPlaying(true);
  };
  const pause = () => {
    setisPlaying(false);
  };
  const nexttrack = () => {
    setcurrentTrackIndex((prev) => {
      const index: number = prev === alltracks.length - 1 ? 0 : prev + 1;
      setcurrentTrack(alltracks[index]);
      play();
      return index;
    });
  };

  const prevtrack = () => {
    setcurrentTrackIndex((next) => {
      const index: number = next === 0 ? alltracks.length - 1 : next - 1;
      setcurrentTrack(alltracks[index]);
      play();
      return index;
    });
  };
  const handleplaysong = (song: track, index: number) => {
    setcurrentTrack(song);
    setcurrentTrackIndex(index);
    setisPlaying(true);
  };

  return (
    <GlobalContext.Provider
      value={{
        alltracks,
        setalltracks,
        currentTime,
        setcurrentTime,
        currentTrack,
        setcurrentTrack,
        currentTrackIndex,
        setcurrentTrackIndex,
        duration,
        setduration,
        isPlaying,
        setisPlaying,
        volume,
        setvolume,
        play,
        pause,
        nexttrack,
        prevtrack,
        formattime,
        handleplaysong,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobalContext() {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("Use inside provider");
  }
  return context;
}
