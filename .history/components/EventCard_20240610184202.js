import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import Link from 'next/link';
import { deleteEvent } from '../utils/data/eventData';

const EventCard = ({
  id,
  game,
  description,
  date,
  time,
  organizer,
  playersCount,
  onUpdate,
}) => {
  const handleDeleteEvent = () => {
    const confirmDelete = window.confirm(`Delete ${game.title}?`);
    if (confirmDelete) {
      deleteEvent(id).then(() => onUpdate());
    }
  };

  return (
    <Card className="text-center">
      <Card.Body>
        <Card.Text>Organizer: {organizer}</Card.Text>
        <Card.Text>Description: {description}</Card.Text>
        <Card.Text>Date: {date}</Card.Text>
        <Card.Text>Time: {time}</Card.Text>
        <Card.Text>Game Title: {game.title}</Card.Text>
        <Card.Text>Number of Players: {playersCount}</Card.Text>
        <Button variant="danger" onClick={handleDeleteEvent}>
          DELETE
        </Button>
        <br />
        <br />
        <Link href={`/events/edit/${id}`} passHref>
          <Button id="editButton" variant="info">EDIT</Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

EventCard.propTypes = {
  id: PropTypes.number.isRequired,
  game: PropTypes.shape({
    title: PropTypes.string.isRequired,
  }).isRequired,
  description: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  organizer: PropTypes.string.isRequired,
  playersCount: PropTypes.number.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default EventCard;
