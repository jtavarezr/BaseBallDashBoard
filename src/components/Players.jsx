import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Players = ({ teamId, teamName }) => {
  const api = JSON.parse(import.meta.env.VITE_APP_API_KEY);

  const [details, setDetails] = useState({});
  const [filterValues, setFilterValues] = useState({
    fullName: "",
    position: "",
    jerseyNumber: "",
  });

  const gameId = teamId === null ? 145 : teamId;

  useEffect(() => {
    fetchData(gameId);
  }, [teamId]);

  const fetchData = async (teamId) => {
    const url = `https://baseball4.p.rapidapi.com/v1/mlb/teams-roster?teamIds=${parseInt(
      teamId
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
    }
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilterValues({ ...filterValues, [name]: value });
  };

  return (
    <div className="container">
      <div className="details-container">
        <h1>{teamName} Player Details</h1>
        <div className="row">
          <div className="col-md-4">
            <input
              type="text"
              name="fullName"
              className="form-control mb-3"
              placeholder="Filter by name"
              value={filterValues.fullName}
              onChange={handleFilterChange}
            />
          </div>
          <div className="col-md-4">
            <select
              name="position"
              className="form-control mb-3"
              value={filterValues.position}
              onChange={handleFilterChange}
            >
              <option value="">Filter by position</option>
              <option value="C">Catcher</option>
              <option value="1B">First Base</option>
              <option value="2B">Second Base</option>
              <option value="3B">Third Base</option>
              <option value="SS">Shortstop</option>
              <option value="LF">Left Field</option>
              <option value="CF">Center Field</option>
              <option value="RF">Right Field</option>
              <option value="P">Pitcher</option>
            </select>
          </div>
          <div className="col-md-4">
            <input
              type="number"
              name="jerseyNumber"
              className="form-control mb-3"
              placeholder="Filter by jersey number"
              value={filterValues.jerseyNumber}
              onChange={handleFilterChange}
            />
          </div>
        </div>
        {details.body && (
          <div className="row">
            {details?.body?.roster
              .filter(
                (player) =>
                  player.person.fullName
                    .toLowerCase()
                    .includes(filterValues.fullName.toLowerCase()) &&
                  player.position.abbreviation
                    .toLowerCase()
                    .includes(filterValues.position.toLowerCase()) &&
                  player.jerseyNumber
                    .toLowerCase()
                    .includes(filterValues.jerseyNumber.toLowerCase())
              )
              .map((player) => (
                <div className="col-md-4 mb-4" key={player.person.id}>
                  <div className="card">
                    <div className="card-body">
                      <p className="card-text">Number: {player.jerseyNumber}</p>
                      <p className="card-text">
                        Name: {player.person.fullName}
                      </p>
                      <p className="card-text">
                        Position: {player.position.abbreviation}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Players;
