import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import {
  getEvents, createEvent, updateEvent, getEventById,
} from '../../utils/data/eventData';

const EventForm = ({ user, eventId }) => {
  const [events, setEvents] = useState([]);
  const [currentEvent, setCurrentEvent] = useState({
    game: '',
    description: '',
    date: '',
    time: '',
    organizer: '',
  });
  const router = useRouter();

  useEffect(() => {
    getEvents().then((data) => setEvents(data));

    if (eventId) {
      getEventById(eventId).then((event) => setCurrentEvent(event));
    }
  }, [eventId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentEvent((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const event = {
      game: currentEvent.game,
      description: currentEvent.description,
      date: currentEvent.date,
      time: currentEvent.time,
      organizer: currentEvent.organizer || user.uid,
      userId: user.uid,
    };

    if (eventId) {
      updateEvent(eventId, event).then(() => router.push('/events'));
    } else {
      createEvent(event).then(() => router.push('/events'));
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Game</Form.Label>
          <Form.Control
            name="game"
            required
            value={currentEvent.game}
            onChange={handleChange}
            as="select"
          >
            <option value="">Select a game</option>
            {events.map((event) => (
              <option key={event.id} value={event.id}>
                {event.title}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            name="description"
            required
            value={currentEvent.description}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Date</Form.Label>
          <Form.Control
            name="date"
            type="date"
            required
            value={currentEvent.date}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Time</Form.Label>
          <Form.Control
            name="time"
            type="time"
            required
            value={currentEvent.time}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Organizer</Form.Label>
          <Form.Control
            name="organizer"
            required
            value={currentEvent.organizer}
            onChange={handleChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          {eventId ? 'Update' : 'Submit'}
        </Button>
      </Form>
    </>
  );
};

EventForm.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
  }).isRequired,
  eventId: PropTypes.string,
};

EventForm.defaultProps = {
  eventId: null,
};

export default EventForm;
