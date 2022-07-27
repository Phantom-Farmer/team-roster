import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSinglePlayer } from '../../api/playerData';
import PlayerCard from '../../components/PlayerCard';

export default function ViewPlayer() {
  const [viewPlayer, setViewPlayer] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSinglePlayer(firebaseKey).then(setViewPlayer);
  }, [firebaseKey]);

  return (
    <div className="d-flex flex-wrap">
      <PlayerCard key={firebaseKey} playerObj={viewPlayer} />
    </div>
  );
}
