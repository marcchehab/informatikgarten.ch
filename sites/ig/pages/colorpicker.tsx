"use client"

// pages/color-picker.tsx
import React, { useEffect, useState } from 'react';

const ColorPickerPage: React.FC = () => {
  const [red, setRed] = useState<number>(0);
  const [green, setGreen] = useState<number>(0);
  const [blue, setBlue] = useState<number>(0);

  useEffect(() => {
    const savedColor = localStorage.getItem('backgroundColor');
    if (savedColor) {
      const [r = 0, g = 0, b = 0] = savedColor.split(',').map(Number);
      setRed(r);
      setGreen(g);
      setBlue(b);
    }
  }, []);

  useEffect(() => {
    document.body.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
    localStorage.setItem('backgroundColor', `${red},${green},${blue}`);
  }, [red, green, blue]);

  return (
    <div style={{ padding: '20px' }}>
      <label>
        Red:
        <input
          type="range"
          min="0"
          max="255"
          value={red}
          onChange={(e) => setRed(Number(e.target.value))}
        />
      </label>
      <br />
      <label>
        Green:
        <input
          type="range"
          min="0"
          max="255"
          value={green}
          onChange={(e) => setGreen(Number(e.target.value))}
        />
      </label>
      <br />
      <label>
        Blue:
        <input
          type="range"
          min="0"
          max="255"
          value={blue}
          onChange={(e) => setBlue(Number(e.target.value))}
        />
      </label>
    </div>
  );
};

export default ColorPickerPage;