import "./App.css";
import { useEffect, useState } from "react";
import RenderPlots from './RenderPlots.js';
import Button from 'react-bootstrap/Button'

const App = () => {
  return(
    <div className="container">
      <RenderPlots />
      <Button variant="outline-primary">Upload</Button>
    </div>
  );
}

export default App;
