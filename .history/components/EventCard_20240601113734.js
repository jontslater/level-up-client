import React from 'react';
import { Button, Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Link from 'next/link';

const EventCard = ({
  description,
  date,
  time,
  organizer,
  gameType,
  playersCount,
  eventObj.id,
}) => (
  <Card className="text-center">
    <Card.Body>
      <Card.Text>Organizer: {organizer}</Card.Text>
      <Card.Text>Description: {description}</Card.Text>
      <Card.Text>Date: {date}</Card.Text>
      <Card.Text>Time: {time}</Card.Text>
      <Card.Text>Game Type: {gameType}</Card.Text>
      <Card.Text>Number of Players: {playersCount}</Card.Text>
      <Link href={`/posts/edit/${eventObj.id}`} passHref>
        <Button id="editButton" variant="info">EDIT</Button>
      </Link>
    </Card.Body>
  </Card>
);

EventCard.propTypes = {
  game: PropTypes.shape({
    title: PropTypes.string.isRequired,
    maker: PropTypes.string.isRequired,
    number_of_players: PropTypes.number.isRequired,
    skill_level: PropTypes.number.isRequired,
    game_type: PropTypes.shape({
      label: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  description: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  organizer: PropTypes.shape({
    uid: PropTypes.string.isRequired,
    bio: PropTypes.string.isRequired,
  }).isRequired,
  gameType: PropTypes.string.isRequired,
  playersCount: PropTypes.number.isRequired,
};

export default EventCard;
