import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router'; // Import the useRouter hook
import { getGameTypes, getGames } from '../../utils/data/gameData';
import { createEvent } from '../../utils/data/eventData';

const initialState = {
  game: '',
  description: '',
  date: '',
  time: '',
  organizer: '',
  gameType: '',
  gameId: '',
};

const EventForm = ({ user }) => {
  const [gameTypes, setGameTypes] = useState([]);
  const [games, setGames] = useState([]);
  const [currentEvent, setCurrentEvent] = useState(initialState);
  const router = useRouter(); // Define the router variable

  useEffect(() => {
    getGameTypes().then((data) => setGameTypes(data));
    getGames().then((data) => setGames(data));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'game') {
      const selectedGame = games.find((game) => game.name === value);
      if (selectedGame) {
        setCurrentEvent((prevState) => ({
          ...prevState,
          gameId: selectedGame.id,
          [name]: value,
        }));
      }
    } else {
      setCurrentEvent((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const event = {
      description: currentEvent.description,
      date: currentEvent.date,
      time: currentEvent.time,
      organizer: currentEvent.organizer,
      gameType: currentEvent.gameType,
      gameId: currentEvent.gameId,
      userId: user.uid,
    };

    createEvent(event).then(() => router.push('/events/index'));
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Game</Form.Label>
          <Form.Control
            as="select"
            name="game"
            required
            value={currentEvent.game}
            onChange={handleChange}
          >
            <option value="">Select a game</option>
            {games.map((game) => (
              <option key={game.id} value={game.name}>
                {game.name}
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

        <Form.Group className="mb-3">
          <Form.Label>Game Type</Form.Label>
          <Form.Control
            name="gameType"
            required
            value={currentEvent.gameType}
            onChange={handleChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};

EventForm.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
  }).isRequired,
};

export default EventForm;
