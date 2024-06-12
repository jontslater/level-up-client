import { useEffect, useRef } from 'react';
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
  onDelete,
}) => {
  const isMounted = useRef(true);

  useEffect(() => () => {
    isMounted.current = false;
  }, []);

  const handleDeleteEvent = () => {
    const confirmDelete = window.confirm(`Delete ${game.title} event?`);
    if (confirmDelete) {
      deleteEvent(id).then(() => {
        if (isMounted.current) {
          onDelete(id);
          window.location.reload();
        }
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
        <Button variant="danger" onClick={handleDeleteEvent}>
          Delete
        </Button>
      </Card.Body>
    </Card>
  );
};

export default EventCard;
