/* eslint-disable react-hooks/exhaustive-deps */
import { React, useEffect, useState } from 'react';
import { getPlayers } from '../api/playerData';
import PlayerCard from '../components/PlayerCard';
import { useAuth } from '../utils/context/authContext';
import Search from '../components/Search';

export default function Roster() {
  const [players, setPlayers] = useState([]);
  const [playerFilter, setPlayerFilter] = useState([]);
  const { user } = useAuth();
  const getAllPlayers = () => {
    getPlayers(user.uid).then((playerArray) => {
      setPlayers(playerArray);
      setPlayerFilter(playerArray);
    });
  };

  useEffect(() => {
    getAllPlayers(user.uid);
  }, [user.uid]);
  return (
    <>
      <div className="search-bar">
        <Search players={players} setPlayerFilter={setPlayerFilter} />
      </div>
      <div className="d-flex flex-wrap">
        {playerFilter.map((playerObj) => (
          <PlayerCard key={playerObj.firebaseKey} playerObj={playerObj} onUpdate={getAllPlayers} />))}
      </div>
    </>
  );
}
