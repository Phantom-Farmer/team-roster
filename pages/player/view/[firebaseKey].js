import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSinglePlayer } from '../../../api/playerData';
import PlayerCardPlus from '../../../components/PlayerCardPlus';

export default function ViewPlayer() {
  const [viewItem, setViewItem] = useState({});
  const router = useRouter();
  // grab the firebasekey
  const { firebaseKey } = router.query;

  // make a call to the API to get the author data
  useEffect(() => {
    getSinglePlayer(firebaseKey).then(setViewItem);
  }, [firebaseKey]);

  // pass object to form
  return (<PlayerCardPlus playerObj={viewItem} />);
}
