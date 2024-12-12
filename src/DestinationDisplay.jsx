import React from 'react';

function DestinationDisplay({ category, onFindDestination, destination }) {
  return (
    <>
      {category && (
        <div>
          <h2>Selected Category: {category}</h2>
          <button className="find-destination-btn" onClick={onFindDestination}>
            Find Destination
          </button>
        </div>
      )}
      {destination && <h3>Your Next Destination: {destination}</h3>}
    </>
  );
}

export default DestinationDisplay;
