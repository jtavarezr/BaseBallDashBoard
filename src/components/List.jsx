import React from "react";

/**
 * List component responsible for rendering a list of teams.
 * @param {Array} teams - Array containing team names.
 */
const List = ({ teams }) => {
  return (
    <div className="list-container">
      <h3>Today's Teams</h3>
      <div className="d-grid gap-2">
        {/* Render buttons for each team */}
        {teams.map((team, index) => (
          <button
            key={index}
            className="btn btn-outline-primary mb-2"
            style={{ width: "200px", margin: "2px" }}
          >
            {team}
          </button>
        ))}
      </div>
    </div>
  );
};

export default List;
