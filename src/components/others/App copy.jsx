import React, { useState, useEffect } from "react";
import "./App.css";
import SideNav from "./components/SideNav";
import Card from "./components/Card";
import GameCard from "./components/others/GameCard";

const API_KEY = import.meta.env.API_KEY;
const API_PROVIDER = import.meta.env.API_PROVIDER;
const API_HOST_NAME = import.meta.env.API_HOST_NAME;
const API_URL = import.meta.env.API_URL;

function App() {
  const [gameList, setGameList] = useState(null);
  const [game, setGame] = useState(null);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState("2023-07-30"); // Valor inicial para la fecha

  useEffect(() => {
    fetchData(selectedDate); // Llama a la función fetchData al inicio y cuando selectedDate cambie
  }, [selectedDate]); // Se ejecutará cuando selectedDate cambie

  const fetchData = async (date) => {
    const url = `https://baseball4.p.rapidapi.com/v1/mlb/schedule?date=${date}`;

    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "0a74139a61mshfb6663e121ae140p175d39jsn0af6acaf8ec8",
        "X-RapidAPI-Host": "baseball4.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error("Error al obtener los datos");
      }
      const data = await response.json();
      setGameList(data);
      //console.log(data);
      const gameData = extractGameData(data);
      setGame(gameData);
    } catch (error) {
      setError(error.message);
    }
  };

  const extractGameData = (data) => {
    const gameInfo = data?.body[0];
    if (!gameInfo) return null;

    const { officialDate, teams, status } = gameInfo;
    const { home, away } = teams;

    const gameData = {
      date: officialDate,
      status: status?.abstractGameState,
      hometeam: {
        name: home?.team?.name,
        score: home?.score,
        logo: `https://www.mlbstatic.com/team-logos/${home?.team?.id}.svg`,
      },
      visitorTeam: {
        name: away?.team?.name,
        score: away?.score,
        logo: `https://www.mlbstatic.com/team-logos/${away?.team?.id}.svg`,
      },
    };

    return gameData;
  };

  const handleInputChange = (event) => {
    setSelectedDate(event.target.value); // Actualiza el estado de selectedDate cuando cambia la fecha seleccionada
  };

  return (
    <>
      <input
        type="date"
        id="selectedDate"
        value={selectedDate}
        onChange={handleInputChange}
      />

      {game && <GameCard {...game} />}

      <div className="container">
        <h1>Hello World!</h1>
        {error && <p>{error}</p>}
      </div>
      <SideNav
        date={game?.date}
        home={game?.hometeam?.name}
        away={game?.visitorTeam?.name}
      />
      <Card />
    </>
  );
}

export default App;
