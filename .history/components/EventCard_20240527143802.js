import React from 'react';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';

const EventCard = ({
  game,
  description,
  date,
  time,
  organizer,
}) => (
  <Card className="text-center">
    <Card.Header>{game.title}</Card.Header>
    <Card.Body>
      <Card.Text>Organizer: {organizer}</Card.Text>
      <Card.Text>Description: {description}</Card.Text>
      <Card.Text>Date: {date}</Card.Text>
      <Card.Text>Time: {time}</Card.Text>
      <Card.Text>Game Type: {game.game_type}</Card.Text>
      <Card.Text>Number of Players: {game.number_of_players}</Card.Text>
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
};

export default EventCard;
