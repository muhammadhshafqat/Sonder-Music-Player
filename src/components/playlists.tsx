import { useState } from "react";
import { useGlobalContext } from "../context/globalContext";
import "../styles/playlists.css";

function Playlists() {
  const context = useGlobalContext();
  const [playlistName, setplaylistName] = useState("");
  const removePlaylist = (index: any) => {
    const updatedPlaylists = (context.playlist || []).filter(
      (playlist) => playlist.id !== index,
    );
    context.setplaylist(updatedPlaylists);
  };
  const handleAdd = () => {
    context.createPlaylist(playlistName, context.selectedTracks!);
    setplaylistName("");
  };
  return (
    <div className="playlists-container">
      <h2 className="Lib-heading">Playlist</h2>
      <input
        type="text"
        value={playlistName}
        className="playlist-input"
        placeholder="Title"
        onChange={(e) => {
          setplaylistName(e.target.value);
        }}
      ></input>
      <button className="playlist-add-btn" type="submit" onClick={handleAdd}>
        +
      </button>
      <div className="playlistentry-container">
        {!context.playlist || context.playlist.length == 0
          ? "No playlists found! Create one"
          : context.playlist?.map((playlist, index) => (
              <div className="playlist-entry" key={index}>
                <p className="playlist-title">
                  {context.playlist![index].name}
                </p>
                <p className="track-count">
                  Tracks: {context.playlist![index].playlistTracks.length}
                </p>
                <button
                  className="delete-btn"
                  onClick={() => removePlaylist(context.playlist![index].id)}
                >
                  <img
                    className="delete-btn-icon"
                    src="/icons/delete.png"
                    alt=""
                  />
                </button>
                <div className="playlist-tracks">
                  {context.playlist![index].playlistTracks.length == 0
                    ? "NO tracks have been added"
                    : context.playlist![index].playlistTracks.map(
                        (track, pos) => (
                          <div className="track-list-playlist" key={pos}>
                            <p>{track.title}</p>
                            <p>{track.artist}</p>
                          </div>
                        ),
                      )}
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}

export default Playlists;
