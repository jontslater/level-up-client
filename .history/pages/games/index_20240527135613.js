import React, { useState, useEffect } from 'react';
import GameCard from '../../components/GameCard';
import EventCard from '../../components/EventCard';
import { getGames } from '../../utils/data/gameData';
import { getEvents } from '../../utils/data/eventData';

function Home() {
  const [games, setGames] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getGames().then((data) => setGames(data));
    getEvents().then((data) => setEvents(data));
  }, []);

  return (
    <article className="games">
      <h1>Games</h1>
      {games.map((game) => (
        <section key={`game--${game.id}`} className="game">
          <GameCard
            title={game.title}
            maker={game.maker}
            numberOfPlayers={game.number_of_players}
            skillLevel={game.skill_level}
          />
        </section>
      ))}
      <h1>Events</h1>
      {events.map((event) => (
        <section key={`event--${event.id}`} className="event">
          <EventCard
            game={event.game}
            description={event.description}
            date={event.date}
            time={event.time}
            organizer={event.organizer}
          />
        </section>
      ))}
    </article>
  );
}

export default Home;
