import React from 'react';
import { Howl, Howler } from 'howler';
import CanvasManipulator from "./CanvasManipulator";
import './App.css';
// only for deployment
const image = require('/mixkit-thunder-deep-rumble-1296.mp3');

  const sound = new Howl({
    src: ['/mixkit-thunder-deep-rumble-1296.mp3'],
    loop: true,
    volume: 0.5,
    autoplay: true
  });

function App() {
  return (
    <div className="App">
      <div className="bg"></div>
      <div className="lightning flashit"></div>
      <header className="App-header">
        <h1>Orage et parapluie</h1>
        <CanvasManipulator />
        <div className="buttons">
          <button onClick={() => sound.play()}>Play</button>
          <button onClick={() => sound.stop()}>Stop</button>
        </div>
      </header>
    </div>
  );
}

export default App;
