import "./App.css";
import { useEffect, useState } from "react";
import RenderPlots from './RenderPlots.js';
import CameraIcon from './camera.svg';
import profile from "./profile.png";

const App = () => {
  const [src, setSrc] = useState(profile);
  const handleSubmit = () => {
    console.log('here');
    const photo = document.getElementById("upload").files[0];
    if(photo){
      const fileReader = new FileReader();
      fileReader.readAsDataURL(photo);
      fileReader.onload = (e) => {
      setSrc(e.target.result);
    };
    }
  };
  useEffect(()=>{
    document.getElementById("upload").addEventListener("change",handleSubmit);
  },[])
  return(
    <div className="container">
      <RenderPlots img={src}/>
      <label htmlFor="upload">
        <img src={CameraIcon}/>
      </label>
      <input type="file" id="upload"/>
    </div>
  );
}

export default App;
