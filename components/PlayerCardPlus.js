import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import { getSinglePlayer } from '../api/playerData';

export default function PlayerCardPlus({ playerObj }) {
  getSinglePlayer(playerObj.firebaseKey);
  return (
    <Card style={{ width: '18rem', margin: '5px' }}>
      <Card.Body>
        <div>Name: {playerObj.first_name} {playerObj.last_name}</div>
        <div>Position: {playerObj.position}</div>
        <div>Nickname: {playerObj.nickname}</div>
        <div>Number: {playerObj.number}</div>
        <div>Height: {playerObj.height}</div>
        <div>Weight: {playerObj.weight}</div>
        <div>Specialty: {playerObj.specialty}</div>
        <Card.Img variant="top" src={playerObj.imageURL} alt={playerObj.first_name} style={{ height: '200px' }} />
      </Card.Body>
    </Card>
  );
}

PlayerCardPlus.propTypes = {
  playerObj: PropTypes.shape({
    imageURL: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    position: PropTypes.string,
    nickname: PropTypes.string,
    firebaseKey: PropTypes.string,
    number: PropTypes.string,
    height: PropTypes.string,
    weight: PropTypes.string,
    specialty: PropTypes.string,
  }).isRequired,
};
