import { useGlobalContext } from "../context/globalContext";

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
      {context.alltracks.map((song, index) => (
        <div
          className="track-entry"
          onClick={() => handleLibraryplays(song, index)}
        >
          <img
            src={context.alltracks[index].cover}
            className="library-covers"
          />
          <p className="lib-track-title" key={index}>
            {context.alltracks[index].title}
          </p>
          <p className="lib-track-artist" key={index}>
            {context.alltracks[index].artist}
          </p>
        </div>
      ))}
    </div>
  );
}

export default Library;
