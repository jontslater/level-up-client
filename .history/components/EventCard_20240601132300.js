import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
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
  onUpdate,
}) => {
  const router = useRouter();

  const handleDeleteEvent = () => {
    const confirmDelete = window.confirm(`Delete ${game.title} event?`);
    if (confirmDelete) {
      deleteEvent(id).then(() => {
        onUpdate();
        router.push('/events');
      });
    }
  };

  return (
    <Card className="text-center">
      <Card.Body>
        <Card.Text>Organizer: {organizer.uid}</Card.Text>
        <Card.Text>Description: {description}</Card.Text>
        <Card.Text>Date: {date}</Card.Text>
        <Card.Text>Time: {time}</Card.Text>
        <Card.Text>Game Title: {game.title}</Card.Text>
        <Card.Text>Number of Players: {playersCount}</Card.Text>
        <Button
          id="deleteButton"
          variant="danger"
          onClick={handleDeleteEvent}
          className="m-2"
        >
          DELETE
        </Button>
      </Card.Body>
    </Card>
  );
};

EventCard.propTypes = {
  id: PropTypes.string.isRequired,
  game: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  description: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  organizer: PropTypes.shape({
    uid: PropTypes.string.isRequired,
  }).isRequired,
  playersCount: PropTypes.number.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default EventCard;
