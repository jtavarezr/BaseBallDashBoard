import React from "react";
import "../../assets/css/Card.css";

function GameCard({ date, status, hometeam, visitorTeam }) {
  console.log("HOMETEAM", hometeam);

  return (
    <div className="game-card">
      <div className="header">
        <div className="date">{date}</div>
        <div className="status">{status}</div>
      </div>
      <div className="teams">
        <div className="team">
          <img src={hometeam.logo} alt={hometeam.name} />
          <span className="team-name">{hometeam.name}</span>
          <span className="score">{hometeam.score}</span>
        </div>
        <div className="team">
          <img src={visitorTeam.logo} alt={visitorTeam.name} />
          <span className="team-name">{visitorTeam.name}</span>
          <span className="score">{visitorTeam.score}</span>
        </div>
      </div>
      {/* Repite la estructura para otros juegos */}
    </div>
  );
}
export default GameCard;
