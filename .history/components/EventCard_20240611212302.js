import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import Link from 'next/link';
import { deleteEvent, joinEvent, leaveEvent } from '../utils/data/eventData';
import { useAuth } from '../utils/context/authContext';

const EventCard = ({
  id, game, description, date, time, organizer, playersCount, joined, onUpdate,
}) => {
  const { user } = useAuth();

  const handleJoinEvent = () => {
    joinEvent(user.uid, id).then(onUpdate);
  };

  const handleLeaveEvent = () => {
    leaveEvent(user.uid, id).then(onUpdate);
  };

  const handleDeleteEvent = () => {
    const confirmDelete = window.confirm(`Delete ${game.title}?`);
    if (confirmDelete) {
      deleteEvent(id, user.uid).then(() => {
        onUpdate();
      }).catch((error) => {
        console.error('Error deleting event:', error);
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
        <Card.Text>Game Title: {game}</Card.Text>
        <Card.Text>Number of Players: {playersCount}</Card.Text>
        <Button variant="danger" onClick={handleDeleteEvent}>
          DELETE
        </Button>
        <br />
        <br />
        <Link href={`/events/edit/${id}`} passHref>
          <Button id="editButton" variant="info">EDIT</Button>
        </Link>
        {joined ? 
          (<Button onClick={handleJoinEvent}>Join</Button>
        ) : (
          
        )}<Button onClick={handleLeaveEvent}>Leave</Button>
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
  joined: PropTypes.bool.isRequired,
};

export default EventCard;
