/* eslint-disable react-hooks/exhaustive-deps */
import { React, useEffect, useState } from 'react';
import { getPlayers } from '../api/playerData';
import PlayerCard from '../components/PlayerCard';
import { useAuth } from '../utils/context/authContext';

export default function Roster() {
  const [players, setPlayers] = useState([]);
  const { user } = useAuth();
  const getAllPlayers = () => {
    getPlayers(user.uid).then(setPlayers);
  };

  useEffect(() => {
    getAllPlayers(user.uid);
  }, [user.uid]);
  return (
    <div className="d-flex flex-wrap">
      {players.map((playerObj) => (
        <PlayerCard key={playerObj.firebaseKey} playerObj={playerObj} onUpdate={getAllPlayers} />))}
    </div>
  );
}
