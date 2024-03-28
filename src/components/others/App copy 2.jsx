import React, { useState, useEffect } from "react";
import "./App.css";
import SideNav from "../SideNav";
import Card from "../Card";
import GameCard from "./GameCard";
import data from "../../data.json"; // Importa el archivo data.json

function App() {
  const [gameList, setGameList] = useState(null);
  const [game, setGame] = useState(null);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState("2023-07-30"); // Valor inicial para la fecha

  useEffect(() => {
    // Aquí puedes utilizar el archivo data.json en lugar de llamar a fetchData
    console.log(data);
    setGameList(data); // Establece gameList con los datos del archivo data.json
    console.log("GameList: ", gameList);

    const gameData = extractGameData(data); // Procesa los datos para obtener información del juego
    console.log("GameList: ", gameList);
    setGame(gameData); // Establece el juego actual
    console.log("Game: ", game);
  }, [selectedDate]); // Este efecto se ejecutará una vez al cargar la aplicación

  const extractGameData = (data) => {
    console.log("extractGameData: ", data);

    // Verificar si data.body es un array antes de llamar a map()
    if (!Array.isArray(data.body)) {
      console.error("data.body no es un array:", data.body);
      return []; // Devolver un array vacío en caso de que data.body no sea un array
    }

    const gameDataList = data.body.map((gameItem) => {
      console.log("Game PK:", gameItem.gamePk);

      const { officialDate, teams, status } = gameItem;
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
    });

    console.log("GameData List:", gameDataList);
    return gameDataList;
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
      {gameList &&
        Object.entries(gameList.body).map(([key, value]) => (
          <li key={key}>{value.gamePk}</li>
        ))}
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
