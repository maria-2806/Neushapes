import React, { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';

const Slider = ({ label, value, onChange, min, max }) => (
  <div className="flex flex-col items-start mb-4">
    <label className="mb-2 text-sm font-medium">{label}</label>
    <div className="flex items-center w-full">
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={onChange}
        className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
      />
      <input
        type="number"
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        className="w-16 ml-4 p-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800"
      />
    </div>
  </div>
);

export default function NeumorphismEditor() {
  const [size, setSize] = useState(200);
  const [cornerRadius, setCornerRadius] = useState(50);
  const [blur, setBlur] = useState(20);
  const [intensity, setIntensity] = useState(10);
  const [color, setColor] = useState('#e0e0e0');
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  const neumorphismStyle = {
    width: `${size}px`,
    height: `${size}px`,
    borderRadius: `${cornerRadius}%`,
    backgroundColor: color,
    boxShadow: `${intensity}px ${intensity}px ${blur}px ${isDarkMode ? '#1a1a1a' : '#bebebe'}, 
                -${intensity}px -${intensity}px ${blur}px ${isDarkMode ? '#2c2c2c' : '#ffffff'}`,
    transition: 'all 0.3s ease',
  };

  return (
    <div className="min-h-screen bg-[#E0E0E0] dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Neumorphism CSS Generator</h1>
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 rounded-full bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 transition-colors duration-300"
          >
            {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
          </button>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-colors duration-300">
          <div className="md:flex">
            <div className="md:w-1/2 p-8 flex items-center justify-center bg-[#ebeaea] dark:bg-gray-700 transition-colors duration-300">
              <div className="preview-box" style={neumorphismStyle}></div>
            </div>
            <div className="md:w-1/2 p-8 dark:text-gray-200">
              <div className="mb-8">
                <Slider label="Size" value={size} onChange={(e) => setSize(e.target.value)} min={100} max={400} />
                <Slider label="Corner Radius" value={cornerRadius} onChange={(e) => setCornerRadius(e.target.value)} min={0} max={50} />
                <Slider label="Blur" value={blur} onChange={(e) => setBlur(e.target.value)} min={5} max={50} />
                <Slider label="Intensity" value={intensity} onChange={(e) => setIntensity(e.target.value)} min={1} max={30} />
                <div className="flex flex-col items-start mb-4">
                  <label className="mb-2 text-sm font-medium">Color</label>
                  <input
                    type="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="w-full h-10 border border-gray-300 dark:border-gray-600 rounded cursor-pointer"
                  />
                </div>
              </div>
              <div className="bg-gray-800 dark:bg-gray-700 rounded-lg p-4 transition-colors duration-300">
                <h2 className="text-lg font-semibold text-white mb-2">Generated CSS</h2>
                <pre className="text-sm text-gray-300 whitespace-pre-wrap">
                  {
                  `width: ${size}px,
height: ${size}px,
box-shadow: ${intensity}px ${intensity}px ${blur}px ${isDarkMode ? '#1a1a1a' : '#bebebe'}, 
-${intensity}px -${intensity}px ${blur}px ${isDarkMode ? '#2c2c2c' : '#ffffff'};
border-radius: ${cornerRadius}%;
background-color: ${color};`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}