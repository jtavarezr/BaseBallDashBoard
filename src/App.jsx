import React, { useState, useEffect } from "react";
import "./App.css";
import SideNav from "./components/SideNav";
import List from "./components/List";
import Card from "./components/Card";
import Header from "./components/Header";
import Details from "./components/Details";
import "bootstrap/dist/css/bootstrap.min.css"; // Importa Bootstrap CSS


// API_KEY constant obtained from environment variables
  const api = JSON.parse(import.meta.env.VITE_APP_API_KEY);
  console.log(api.api1);
  console.log(api.api2);
/**
 * Main application component responsible for fetching baseball game schedule data and rendering UI components.
 */
function App() {
  // State variables
  const [selectedDate, setSelectedDate] = useState("2023-07-30");
  const [gameList, setGameList] = useState(null);
  const [error, setError] = useState(null);
  const [selectedGamePk, setSelectedGamePk] = useState(null); // State to store selected game primary key

  // Fetch data from API when selectedDate changes
  useEffect(() => {
    fetchData(selectedDate);
  }, [selectedDate]);

  /**
   * Fetch baseball game schedule data from the API.
   * @param {string} date - Date for which to fetch the schedule data.
   */
  const fetchData = async (date) => {
    // Check if data is cached
    const cachedData = sessionStorage.getItem(date);
    if (cachedData) {
      setGameList(JSON.parse(cachedData));
      return;
    }

    // Fetch data from API
    const url = `https://baseball4.p.rapidapi.com/v1/mlb/schedule?date=${date}`;
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
        throw new Error("Error retrieving data");
      }
      const data = await response.json();
      setGameList(data);
      sessionStorage.setItem(date, JSON.stringify(data));
    } catch (error) {
      setError(error.message);
    }
  };

  // Update selected date when input changes
  const handleInputChange = (event) => {
    setSelectedDate(event.target.value);
  };

  /**
   * Handle click on a game card.
   * @param {number} gamePk - Primary key of the selected game.
   */
  const handleCardClick = (gamePk) => {
    setSelectedGamePk(gamePk); // Store selected game primary key in state
    console.log("Game PK");
  };

  /**
   * Extract list of teams from the fetched game data.
   * @returns {string[]} Array of unique team names.
   */
  const teamList = () => {
    let teams = [];
    let teamHome = [];
    let teamAway = [];
    {
      gameList &&
        Object.entries(gameList.body).map(([key, value]) => {
          if (value.teams) {
            teamHome.push(value.teams.home.team.name);
            teamAway.push(value.teams.away.team.name);
          }
        });
      teams = [...new Set([...teamHome, ...teamAway])];
    }
    return teams;
  };

  // Render UI
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col"></div>
        </div>
        <div className="row">
          <div className="col">
            {" "}
            <div className="container">
              {/* Render error message if error exists */}
              {error && <p>{error}</p>}
              {/* Header component */}
              <Header>
                {/* Card component with game list data and click handler */}
                <Card userData={gameList} onCardClick={handleCardClick} />
              </Header>
            </div>
          </div>
          <div className="col-2">
            {" "}
            {/* Side navigation component */}
            <SideNav
              teams={teamList()}
              selectedDate={selectedDate}
              handleInputChange={handleInputChange}
            >
              {/* List component */}
              <List teams={teamList()} />
            </SideNav>
          </div>
          <div className="col">
            {" "}
            <Details gamePk={selectedGamePk} />
          </div>
        </div> 
      </div>

    </>
  );
}

export default App;
