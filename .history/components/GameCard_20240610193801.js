import React from 'react';
import { Button, Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { deleteEvent } from '../utils/data/eventData'; // Ensure this import matches your actual data utility

const GameCard = ({
  id,
  title,
  maker,
  numberOfPlayers,
  skillLevel,
  onUpdate,
}) => {
  const handleDeleteGame = () => {
    const confirmDelete = window.confirm(`Delete ${title}?`);
    if (confirmDelete) {
      deleteEvent(id).then(() => {
        onUpdate();
      });
    }
  };

  return (
    <Card className="text-center">
      <Card.Header>{title}</Card.Header>
      <Card.Body>
        <Card.Title>By: {maker}</Card.Title>
        <Card.Text>{numberOfPlayers} players needed</Card.Text>
        <Button id="deleteButton" variant="danger" onClick={handleDeleteGame} className="m-2">
          DELETE
        </Button>
      </Card.Body>
      <Card.Footer className="text-muted">Skill Level: {skillLevel}</Card.Footer>
      <Link href={`/games/edit/${id}`} passHref>
        <Button id="editButton" variant="info">EDIT</Button>
      </Link>
    </Card>
  );
};

GameCard.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  maker: PropTypes.string.isRequired,
  numberOfPlayers: PropTypes.number.isRequired,
  skillLevel: PropTypes.number.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default GameCard;
