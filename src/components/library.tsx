import { useGlobalContext } from "../context/globalContext";
import "../styles/library.css";
function Library() {
  const context = useGlobalContext();

  const handleLibraryplays = (song: any, index: number) => {
    context.setcurrentTrack(song);
    context.setcurrentTrackIndex(index);
    context.setisPlaying(true);
  };

  return (
    <div className="library-container">
      <h2 className="Lib-heading">Library</h2>
      <div className="track-container">
        {context.alltracks.map((song, index) => (
          <div
            key={index}
            className={`track-entry ${context.currentTrack.title === song.title ? "active-song" : ""}`}
            onClick={() => handleLibraryplays(song, index)}
          >
            <img
              src={context.alltracks[index].cover}
              className="library-covers"
            />
            <div className="track-info-area">
              <span className="lib-track-title">
                {context.alltracks[index].title}
              </span>
              <span className="lib-track-artist">
                {context.alltracks[index].artist}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Library;
