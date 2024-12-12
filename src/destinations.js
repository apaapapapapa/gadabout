export const destinations = {
    City: ["Tokyo, Japan", "New York, USA", "Paris, France"],
    Nature: ["Yellowstone, USA", "Banff, Canada", "Great Barrier Reef, Australia"],
    Culture: ["Kyoto, Japan", "Rome, Italy", "Cairo, Egypt"],
};

export function getRandomDestination(category) {
  if (!category || !destinations[category]) return "";
  const options = destinations[category];
  return options[Math.floor(Math.random() * options.length)];
}
  