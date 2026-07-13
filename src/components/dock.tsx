import { useContext, useEffect, useRef } from "react";
import "../styles/dock.css";
import { useGlobalContext } from "../context/globalContext";

function Dock() {
  const context = useGlobalContext();
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (context.isPlaying) {
      audio.play();
    } else {
      audio.pause();
    }
  }, [context.isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetadata = () => {
      context.setduration(audio.duration);
      if (context.isPlaying) {
        audio.play();
      }
    };
    const handleTimeUpdate = () => {
      context.setcurrentTime(audio.currentTime);
    };
    const handleEnded = () => {
      context.nexttrack();
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [context.currentTrack, context.currentTime]);

  const handletimeupdate = (e: any) => {
    const audio = audioRef.current;
    if (!audio) return;
    const newTime = parseFloat(e.target.value);
    audio.currentTime = newTime;
    context.setcurrentTime(newTime);
  };
  const handlevolumechange = (e: any) => {
    const newvol = parseFloat(e.target.value);
    context.setvolume(newvol);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = context.volume;
  }, [context.volume]);

  return (
    <div className="dock-container">
      <audio
        ref={audioRef}
        preload="metadata"
        src={context?.currentTrack.url}
      ></audio>

      <div className="track-details">
        <span className="dock-title">{context?.currentTrack.title}</span>
        <span className="dock-artist">{context?.currentTrack.artist}</span>
      </div>
      <div className="player">
        <span>{context.formattime(context.currentTime)}</span>
        <input
          type="range"
          className="track-slider"
          min={0}
          max={context.duration}
          step={0.1}
          value={context.currentTime}
          onChange={handletimeupdate}
        />
        <span>{context.formattime(context.duration)}</span>
        <button className="back-btn" onClick={context.prevtrack}>
          <img src="" alt="" className="dock-icon" />
        </button>
        <button
          className="play-btn"
          onClick={() => {
            if (context.isPlaying) {
              context.pause();
            } else {
              context.play();
            }
          }}
        >
          <img src={context.isPlaying ? "" : ""} alt="" className="dock-icon" />
        </button>
        <button className="next-btn" onClick={context.nexttrack}>
          <img src="" alt="" className="dock-icon" />
        </button>
      </div>
      <div className="volume-control">
        <input
          type="range"
          className="volume-slider"
          min={0}
          max={1}
          value={context.volume}
          onChange={handlevolumechange}
          step={0.01}
        />
        <span className="volume-percentage"></span>
      </div>
    </div>
  );
}

export default Dock;
