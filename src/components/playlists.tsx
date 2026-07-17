import { useState } from "react";
import { useGlobalContext } from "../context/globalContext";
import "../styles/playlists.css";
type playlisttype = {
  id: number;
  name: string;
  playlistTracks: track[];
};
type track = {
  id: number;
  title: string;
  artist: string;
  url: string;
  cover: string;
};
function Playlists() {
  const context = useGlobalContext();
  const [playlistName, setplaylistName] = useState("");
  const [searchsong, setsearchsong] = useState("");
  const [selectedPlaylist, setselectedPlaylist] = useState<playlisttype | null>(
    null,
  );
  const [showdropdown, setshowdropdown] = useState(false);
  const searchresults = context.alltracks.filter((song) => {
    const matches =
      song.title.toLowerCase().includes(searchsong.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchsong.toLowerCase());

    const alreadyadded = selectedPlaylist?.playlistTracks.some(
      (track) => track.id === song.id,
    );

    return matches && !alreadyadded;
  });
  const addtracktoplaylist = (song: track) => {
    if (!selectedPlaylist) return;

    context.setplaylist((prev) =>
      prev.map((playlist) =>
        playlist.id === selectedPlaylist.id
          ? { ...playlist, playlistTracks: [...playlist.playlistTracks, song] }
          : playlist,
      ),
    );

    setsearchsong("");
    setshowdropdown(false);
  };
  const removePlaylist = (index: any) => {
    const updatedPlaylists = (context.playlist || []).filter(
      (playlist) => playlist.id !== index,
    );
    context.setplaylist(updatedPlaylists);
  };
  const handleAdd = () => {
    if (playlistName.length == 0) return;
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
      <button className="playlist-add-btn" type="button" onClick={handleAdd}>
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
                <div className="add-song-search">
                  <input
                    type="text"
                    placeholder="Enter song or artist name"
                    value={
                      selectedPlaylist?.id === playlist.id ? searchsong : ""
                    }
                    onChange={(e) => {
                      setsearchsong(e.target.value);
                      setshowdropdown(e.target.value.length > 0);
                      setselectedPlaylist(playlist);
                    }}
                    onBlur={() => {
                      setTimeout(() => setshowdropdown(false), 200);
                    }}
                    onFocus={(e) => {
                      setshowdropdown(e.target.value.length > 0);
                      setselectedPlaylist(playlist);
                    }}
                  />
                </div>
                {showdropdown == true &&
                  playlist.id == selectedPlaylist?.id && (
                    <div className="dropdown-search">
                      {searchresults.length === 0 ? (
                        <div className="search-entry">
                          <span>No songs found.</span>
                        </div>
                      ) : (
                        searchresults.map((song, index) => (
                          <div
                            className="search-entry"
                            onMouseDown={() => addtracktoplaylist(song)}
                            key={index}
                          >
                            <span className="playlist-song-title">
                              {song.title}
                            </span>
                            <span className="playlist-song-artist">
                              {song.artist}
                            </span>
                          </div>
                        ))
                      )}
                    </div>
                  )}
                <div className="playlist-tracks">
                  {context.playlist![index].playlistTracks.length == 0
                    ? "Search to add tracks to this playlist"
                    : context.playlist![index].playlistTracks.map(
                        (track, pos) => (
                          <div
                            className="track-list-playlist"
                            onClick={() => {
                              context.handleplaysong(
                                playlist.playlistTracks[pos],
                                playlist.playlistTracks[pos].id,
                              );
                            }}
                            key={pos}
                          >
                            <span className="playlist-song-title">
                              {track.title}
                            </span>
                            <span className="playlist-song-artist">
                              {track.artist}
                            </span>
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
