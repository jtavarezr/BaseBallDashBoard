// App.js
import React, { useState, useEffect } from "react";
import "./App.css";
import SideNav from "./components/SideNav";
import List from "./components/List";
import Card from "./components/Card";
import NewCard from "./components/NewCard";

function App() {
  const [selectedDate, setSelectedDate] = useState("2023-07-30");
  const [gameList, setGameList] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData(selectedDate);
  }, [selectedDate]);

  const fetchData = async (date) => {
    const cachedData = sessionStorage.getItem(date);
    if (cachedData) {
      setGameList(JSON.parse(cachedData));
      return;
    }

    const url = `https://baseball4.p.rapidapi.com/v1/mlb/schedule?date=${date}`;
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "397aaffd18msh4a44cfff3c97b29p1ef474jsn1be516fe455a",
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
      sessionStorage.setItem(date, JSON.stringify(data));
    } catch (error) {
      setError(error.message);
    }
  };

  const handleInputChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const teamList = () => {
    let equipos = [];
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
      equipos = [...new Set([...teamHome, ...teamAway])];
    }
    return equipos;
  };

  return (
    <>
      <div className="header-container">
        <div className="container">{error && <p>{error}</p>}</div>
      </div>
    <NewCard data={gameList} />

      <SideNav
        teams={teamList()}
        selectedDate={selectedDate}
        handleInputChange={handleInputChange}
        list={gameList}
      >
        <List teams={teamList()} />
      </SideNav>
      <Card props={gameList} />
    </>
  );
}

export default App;
