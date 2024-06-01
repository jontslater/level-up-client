import React from 'react';
import { Button, Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Link from 'next/link';

const EventCard = ({
  game,
  description,
  date,
  time,
  organizer,
  gameType,
  playersCount,
}) => (
  <Card className="text-center">
    <Card.Body>
      <Card.Text>Organizer: {organizer.uid}</Card.Text>
      <Card.Text>Description: {description}</Card.Text>
      <Card.Text>Date: {date}</Card.Text>
      <Card.Text>Time: {time}</Card.Text>
      <Card.Text>Game Title: {game.title}</Card.Text>
      <Card.Text>Maker: {game.maker}</Card.Text>
      <Card.Text>Number of Players: {game.number_of_players}</Card.Text>
      <Card.Text>Skill Level: {game.skill_level}</Card.Text>
      <Card.Text>Game Type: {game.game_type.label}</Card.Text>
      <Card.Text>Number of Players: {playersCount}</Card.Text>
      <Link href={`/posts/edit/${game.id}`} passHref>
        <Button id="editButton" variant="info">EDIT</Button>
      </Link>
    </Card.Body>
  </Card>
);

EventCard.propTypes = {
  game: PropTypes.shape({
    id: PropTypes.string.isRequired,
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
