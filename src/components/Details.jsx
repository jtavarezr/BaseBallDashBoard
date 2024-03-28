import React, { useEffect, useState } from "react";
import "../assets/css/SideNav.css";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import Players from "./Players";

const Details = ({ gamePk }) => {
  const api = JSON.parse(import.meta.env.VITE_APP_API_KEY);

  // State to store details of the game
  const [details, setDetails] = useState({});
  const [selectedTeamId, setSelectedTeamId] = useState(null); // State to store selected game primary key
  const [teamId, setTeamId] = useState(null); // State to store team id
  const [teamName, setTeamName] = useState(null); // State to store team id

  // Set a default game ID if gamePk is null
  const gameId = gamePk === null ? 717208 : gamePk;

  // Fetch game details when gamePk changes
  useEffect(() => {
    fetchData(gameId);
  }, [gamePk]);

  // Fetch team id
  useEffect(() => {
    if (selectedTeamId !== null) {
      setTeamId(selectedTeamId);
    }
  }, [selectedTeamId]);

  // Function to fetch game details from the API
  const fetchData = async (gamePk) => {
    const url = `https://baseball4.p.rapidapi.com/v1/mlb/games-boxscore?gamePk=${parseInt(
      gamePk
    )}`;
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": api.api1,
        "X-RapidAPI-Host": "baseball4.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error("Error fetching data");
      }
      const data = await response.json();
      setDetails(data);
    } catch (error) {
      console.error(error);
      // Here you can handle the error, for example, show a message to the user
    }
  };

  const handleCardClick = (teamId, teamName) => {
    setSelectedTeamId(teamId); // Store selected game primary key in state
    setTeamName(teamName); //
  };

  return (
    <>
      <div className="details-container">
        <h1>Game Details</h1>
        {details.body && (
          <div className="row">
            {["home", "away"].map((type) => (
              <div
                className="col-6 mb-4 border"
                key={type}
                onClick={() => handleCardClick(details.body[type].team.id)}
              >
                <div className="card-body">
                  <h5 className="card-title">{details.body[type].team.name}</h5>
                  <p className="card-text">
                    Division: {details.body[type].team.division?.name}
                  </p>
                  <p className="card-text">
                    Season: {details.body[type].team.season}
                  </p>
                  <p className="card-text">
                    Venue: {details.body[type].team.venue?.name}
                  </p>
                  <p className="card-text">
                    Record: {details.body[type].team.record?.wins} -{" "}
                    {details.body[type].team.record?.losses}
                  </p>
                  <p className="card-text">
                    Winning Percentage:{" "}
                    {details.body[type].team.record?.winningPercentage}
                  </p>
                  <p className="card-text">
                    Runs: {details.body[type].teamStats.batting.runs}
                  </p>
                  <p className="card-text">
                    Hits: {details.body[type].teamStats.batting.hits}
                  </p>
                  <p className="card-text">
                    Errors: {details.body[type].teamStats.fielding.errors}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="players">
        <h3>Players</h3>
        <Players teamId={teamId !== null ? teamId : null} teamName={teamName} />
      </div>
    </>
  );
};

export default Details;
