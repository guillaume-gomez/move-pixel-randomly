import React from 'react';
import { Howl } from 'howler';
import CanvasManipulator from "./CanvasManipulator";
import './App.css';
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
        <CanvasManipulator />
        <div className="buttons">
          <button onClick={() => sound.play()}>Play</button>
          <button onClick={() => sound.stop()}>Mute</button>
        </div>
      </header>
    </div>
  );
}

export default App;
