import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { getGameTypes } from '../../utils/data/gameData';
import { createEvent } from '../../utils/data/eventData';

const initialState = {
  game: '',
  description: '',
  date: '',
  time: '',
  organizer: '',
  gameType: '',
};

const EventForm = ({ user }) => {
  const [gameTypes, setGameTypes] = useState([]);
  const [games, setGames] = useState([]);
  const [currentEvent, setCurrentEvent] = useState(initialState);
  const router = useRouter();

  useEffect(() => {
    getGameTypes().then((data) => setGameTypes(data));
    // Fetch the list of games and set it to the state
    fetch(`${clientCredentials.databaseURL}/games`)
      .then((response) => response.json())
      .then((data) => setGames(data));
  }, []);

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
      description: currentEvent.description,
      date: currentEvent.date,
      time: currentEvent.time,
      organizer: currentEvent.organizer,
      gameType: currentEvent.gameType,
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
              <option key={game.id} value={game.id}>
                {game.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        {/* Other form fields */}

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
