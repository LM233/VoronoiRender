import "./App.css";
import { useEffect, useState } from "react";
import profile from "./profile.png";

const nullFunc = () => () => {};

function App() {
  const [onDataClick, setOnDataClick] = useState(nullFunc);
  const [onCopyClick, setOnCopyClick] = useState(nullFunc);
  const [onGrayClick, setOnGrayClick] = useState(nullFunc);
  useEffect(() => {
    const canvas = document.getElementById("profile");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.src = profile;
    img.onload = () => {
      canvas.height = img.height / 10;
      canvas.width = (img.width * 3) / 10;
      ctx.drawImage(img, 0, 0, img.width / 10, img.height / 10);
      const newOnDataClick = () => () => {
        console.log("SIZE: ", img.width, img.height);
        console.log(
          ctx.getImageData(0, 0, img.width / 10, img.height / 10).data
        );
      };
      setOnDataClick(newOnDataClick);
      const newOnCopyClick = () => () => {
        const imgData = ctx.getImageData(0, 0, img.width / 10, img.height / 10);
        ctx.putImageData(imgData, 0 + img.width / 10, 0);
      };
      setOnCopyClick(newOnCopyClick);
      const newOnGrayClick = () => () => {
        const imgData = ctx.getImageData(0, 0, img.width / 10, img.height / 10);
        const length = imgData.data.length;
        for (let i = 0; i < length; i += 4) {
          const gray = Math.floor(
            imgData.data[i] * 0.3 +
              imgData.data[i + 1] * 0.59 +
              imgData.data[i + 2] * 0.11
          );
          imgData.data[i] = gray;
          imgData.data[i + 1] = gray;
          imgData.data[i + 2] = gray;
        }
        ctx.putImageData(imgData, 0 + (img.width * 2) / 10, 0);
      };
      setOnGrayClick(newOnGrayClick);
    };
  }, []);
  return (
    <div>
      <canvas id="profile" />
      <div>
        <button onClick={onDataClick}>check data</button>
        <button onClick={onCopyClick}>copy</button>
        <button onClick={onGrayClick}>Copy gray</button>
      </div>
    </div>
  );
}

export default App;
