import { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Dock from "./components/dock";
import Library from "./components/library";
function App() {
  return (
    <>
      <Dock />
      <Routes>
        <Route path="/" element={<Library />}></Route>
      </Routes>
    </>
  );
}

export default App;
