import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import { deleteEvent } from '../utils/data/eventData';

const EventCard = ({
  id,
  game,
  description,
  date,
  time,
  organizer,
  playersCount,
}) => {
  const router = useRouter();

  const handleDeleteEvent = () => {
    const confirmDelete = window.confirm(`Delete ${game.title}?`);
    if (confirmDelete) {
      deleteEvent(id).then(() => {
        router.push('/events');
      });
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
        <Button variant="info" className="m-2">
          EDIT
        </Button>
        <Button variant="danger" onClick={handleDeleteEvent}>
          DELETE
        </Button>
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
};

export default EventCard;
