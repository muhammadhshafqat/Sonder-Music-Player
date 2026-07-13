import { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Dock from "./components/dock";
import Library from "./components/library";
import Playlists from "./components/playlists";
function App() {
  return (
    <>
      <Dock />
      <Routes>
        <Route path="/" element={<Library />}></Route>
        <Route path="/playlists" element={<Playlists />}></Route>
      </Routes>
    </>
  );
}

export default App;
