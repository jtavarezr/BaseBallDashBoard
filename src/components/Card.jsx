import React from "react";
import "../assets/css/Card.css";

/**
 * Card component responsible for rendering game cards based on provided user data.
 * @param {Object} userData - User data containing game information.
 * @param {Function} onCardClick - Function to handle click event on a card.
 */
function Card({ userData, onCardClick }) {
  /**
   * Handle click event on a game card.
   * @param {number} gamePk - Primary key of the selected game.
   */
  const handleCardClick = (gamePk) => {
    onCardClick(gamePk);
  };

  // Render game cards based on user data
  return (
    <>
      {userData &&
        userData.body &&
        Object.entries(userData.body).map(([key, value]) => {
          const url = "https://www.mlbstatic.com/team-logos/";

          // Check if the data is valid
          const isEventData = key.includes("events");
          const isValidData =
            value &&
            value !== "" &&
            Object.keys(value).length > 0 &&
            !isEventData;

          if (isValidData) {
            return (
              <div className="card" key={key}>
                <div className="header">
                  <div className="status">{value?.status?.detailedState}</div>
                </div>

                <div className="teams">
                  {/* Render home and away teams */}
                  {["home", "away"].map((type) => (
                    <div
                      className="team"
                      key={type}
                      onClick={() => handleCardClick(value.gamePk)}
                    >
                      {/* Render team logo, name, and score */}
                      <img
                        src={`${url}${value?.teams?.[type]?.team.id}.svg`}
                        alt={value?.teams?.[type]?.team.name}
                      />
                      <span className="team-name">
                        {value?.teams?.[type]?.team.name}
                      </span>
                      <span className="score">
                        {value?.teams?.[type]?.score}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          } else {
            return null;
          }
        })}
    </>
  );
}

export default Card;
