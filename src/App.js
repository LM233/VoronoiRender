import "./App.css";
import { useEffect, useState } from "react";
import RenderPlots from './RenderPlots.js';
import CameraIcon from './camera.svg';

const App = () => {
  return(
    <div className="container">
      <RenderPlots />
      <label for="upload">
        <img src={CameraIcon}/>
      </label>
      <input type="file" id="upload"/>
    </div>
  );
}

export default App;
