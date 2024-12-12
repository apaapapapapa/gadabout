import React, { useState } from "react";
import "./App.scss";
import { destinations, getRandomDestination as defaultGetRandomDestination } from "./destinations";
import CategoryButtons from "./CategoryButtons";
import DestinationDisplay from "./DestinationDisplay";

function App({ getRandomDestination = defaultGetRandomDestination }) {
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

  const categories = Object.keys(destinations);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Gadabout Explorer</h1>
        <p>Select a category to discover your next adventure!</p>
        
        <CategoryButtons
          categories={categories}
          selectedCategory={category}
          onSelectCategory={handleCategorySelect}
        />

        <DestinationDisplay
          category={category}
          onFindDestination={handleGenerateDestination}
          destination={destination}
        />
      </header>
    </div>
  );
}

export default App;