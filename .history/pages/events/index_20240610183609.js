import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import EventCard from '../../components/EventCard';
import { getEvents } from '../../utils/data/eventData';

function Home() {
  const [events, setEvents] = useState([]);
  const router = useRouter(); // Define the router variable

  useEffect(() => {
    getEvents().then((data) => setEvents(data));
  }, []);

  return (
    <article className="events">
      <h1>Events</h1>
      <Button
        onClick={() => {
          router.push('/events/new');
        }}
      >
        Register New Event
      </Button>
      {events.map((event) => (
        <section key={`event--${event.id}`} className="event">
          <EventCard
            id={event.id}
            game={event.game.title}
            description={event.description}
            date={event.date}
            time={event.time}
            organizer={event.organizer.bio}
            gameType={event.game.game_type.label}
            playersCount={event.game.number_of_players}
            skill_level={event.game.skill_level}
            onUpdate={getEvents}
          />
        </section>
      ))}
    </article>
  );
}

export default Home;
