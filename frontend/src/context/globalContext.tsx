import React, { Children, createContext, useState } from "react";

const preset = [
  {
    id: 1,
    title: "Love You Less",
    artist: "Joji",
    url: "/songs/Joji - Love You Less.mp3",
    cover: "",
  },
  {
    id: 2,
    title: "Caramel",
    artist: "Sleep Token",
    url: "/songs/Sleep Token - Caramel.mp3",
    cover: "",
  },
  {
    id: 3,
    title: "Dracula",
    artist: "Tame Impala",
    url: "/songs/Tame Impala - Dracula.mp3",
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

  currentTime: number;
  setcurrentTime: React.Dispatch<React.SetStateAction<number>>;

  duration: number;
  setduration: React.Dispatch<React.SetStateAction<number>>;

  isPlaying: boolean;
  setisPlaying: React.Dispatch<React.SetStateAction<boolean>>;
};

export const GlobalContext = createContext<GlobalContextType | null>(null);

export function ContextProvider({ children }: { children: React.ReactNode }) {
  const [alltracks, setalltracks] = useState(preset);
  const [currentTrack, setcurrentTrack] = useState(alltracks[0]);

  const [currentTime, setcurrentTime] = useState(0);
  const [duration, setduration] = useState(0);
  const [isPlaying, setisPlaying] = useState(false);

  return (
    <GlobalContext.Provider
      value={{
        alltracks,
        setalltracks,
        currentTime,
        setcurrentTime,
        currentTrack,
        setcurrentTrack,
        duration,
        setduration,
        isPlaying,
        setisPlaying,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
