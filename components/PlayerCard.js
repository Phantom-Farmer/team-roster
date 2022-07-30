import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Card, Button } from 'react-bootstrap';
import { deleteSinglePlayer } from '../api/playerData';

export default function PlayerCard({ playerObj, onUpdate }) {
  const deleteThisPlayer = () => {
    if (window.confirm('Are you sure?')) {
      deleteSinglePlayer(playerObj.firebaseKey).then(onUpdate);
    }
  };
  return (
    <Card style={{ width: '18rem', margin: '5px' }}>
      <Card.Body>
        <div>Name: {playerObj.first_name} {playerObj.last_name}</div>
        <div>Position: {playerObj.position}</div>
        <Card.Img variant="top" src={playerObj.imageURL} alt={playerObj.first_name} style={{ height: '200px' }} />
        <Link href={`/player/view/${playerObj.firebaseKey}`} passHref>
          <Button variant="primary" className="m-2">VIEW</Button>
        </Link>
        <Link href={`/player/edit/${playerObj.firebaseKey}`} passHref>
          <Button variant="info">EDIT</Button>
        </Link>
        <Link href="/roster" passHref>
          <Button variant="danger" onClick={deleteThisPlayer} className="m-2">
            DELETE
          </Button>
        </Link>
      </Card.Body>
    </Card>
  );
}

PlayerCard.propTypes = {
  playerObj: PropTypes.shape({
    imageURL: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    position: PropTypes.string,
    nickname: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
