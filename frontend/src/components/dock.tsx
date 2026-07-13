import { useContext } from "react";
import "../styles/dock.css";
import { GlobalContext } from "../context/globalContext";

function Dock() {
  const context = useContext(GlobalContext);
  return (
    <div className="dock-container">
      <div className="track-details">
        <span className="dock-title">{context?.currentTrack.title}</span>
        <span className="dock-artist">{context?.currentTrack.artist}</span>
      </div>
      <div className="player">
        <input type="range" className="track-slider" min={0} />
        <button className="back-btn">
          <img src="" alt="" className="dock-icon" />
        </button>
        <button className="play-btn">
          <img src="" alt="" className="dock-icon" />
        </button>
        <button className="next-btn">
          <img src="" alt="" className="dock-icon" />
        </button>
      </div>
      <div className="volume-control">
        <input
          type="range"
          className="volume-slider"
          min={0}
          max={1}
          step={0.01}
        />
        <span className="volume-percentage"></span>
      </div>
    </div>
  );
}

export default Dock;
