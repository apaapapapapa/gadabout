import React, { useState } from "react";
import "./App.scss";

export const destinations = {
  City: ["Tokyo, Japan", "New York, USA", "Paris, France"],
  Nature: ["Yellowstone, USA", "Banff, Canada", "Great Barrier Reef, Australia"],
  Culture: ["Kyoto, Japan", "Rome, Italy", "Cairo, Egypt"],
};

export const getRandomDestination = (category) => {
  if (!category || !destinations[category]) return "";
  const options = destinations[category];
  return options[Math.floor(Math.random() * options.length)];
};

function App() {
  const [category, setCategory] = useState("");
  const [destination, setDestination] = useState("");

  const handleCategorySelect = (selectedCategory) => {
    setCategory(selectedCategory);
    setDestination("");
  };

  const handleGenerateDestination = () => {
    const randomDestination = getRandomDestination(category);
    setDestination(randomDestination);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Gadabout Explorer</h1>
        <p>Select a category to discover your next adventure!</p>
        <div className="buttons">
          {Object.keys(destinations).map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategorySelect(cat)}
              className={category === cat ? "active" : ""}
            >
              {cat}
            </button>
          ))}
        </div>
        {category && (
          <div>
            <h2>Selected Category: {category}</h2>
            <button className="find-destination-btn" onClick={handleGenerateDestination}>
              Find Destination
            </button>
          </div>
        )}
        {destination && <h3>Your Next Destination: {destination}</h3>}
      </header>
    </div>
  );
}

export default App;
