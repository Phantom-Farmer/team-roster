import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSinglePlayer } from '../../../api/playerData';
import NewPlayerForm from '../../../components/forms/NewPlayerForm';

export default function EditPlayer() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  // grab the firebasekey
  const { firebaseKey } = router.query;

  // make a call to the API to get the author data
  useEffect(() => {
    getSinglePlayer(firebaseKey).then(setEditItem);
  }, [firebaseKey]);

  // pass object to form
  return (<NewPlayerForm obj={editItem} />);
}
