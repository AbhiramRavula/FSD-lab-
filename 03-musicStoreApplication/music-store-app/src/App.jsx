import React, { useRef, useState } from "react";
import songsData from "./songs";
import "./App.css"; // Style as needed

function App() {
  const [currentSong, setCurrentSong] = useState(songsData[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const playSong = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const pauseSong = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "2em auto", padding: 16 }}>
      <h2>🎵 Music Store</h2>
      <ul>
        {songsData.map(song => (
          <li
            key={song.id}
            style={{
              background: currentSong.id === song.id ? "#def" : "#fff",
              margin: 8,
              padding: 8,
              borderRadius: 4,
              cursor: "pointer"
            }}
            onClick={() => {
              setCurrentSong(song);
              setIsPlaying(true);
              setTimeout(() => playSong(), 0);
            }}
          >
            <strong>{song.name}</strong> <br />
            <em>{song.artist}</em>
          </li>
        ))}
      </ul>

      <audio
        ref={audioRef}
        src={currentSong.url}
        onEnded={() => setIsPlaying(false)}
      />

      <div style={{ marginTop: 16 }}>
        {isPlaying ? (
          <button onClick={pauseSong}>Pause</button>
        ) : (
          <button onClick={playSong}>Play</button>
        )}
      </div>
      <div style={{ marginTop: 12 }}>
        <strong>Now Playing: </strong>
        {currentSong.name} by {currentSong.artist}
      </div>
    </div>
  );
}

export default App;
