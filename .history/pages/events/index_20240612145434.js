import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import EventCard from '../../components/EventCard';
import { getEvents } from '../../utils/data/eventData';
import { useAuth } from '../../utils/context/authContext';

function Home() {
  const [events, setEvents] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getEvents(user.uid).then((data) => setEvents(data));
  }, [user.uid]);

  const onUpdate = () => {
    getEvents(user.uid).then((data) => setEvents(data));
  };

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
            key={event.id}
            id={event.id}
            game={{ title: event.gameTitle }} // Ensure game is an object with a title property
            description={event.description}
            date={event.date}
            time={event.time}
            organizer={event.organizer}
            playersCount={event.playersCount}
            joined={event.joined}
            onUpdate={onUpdate}
          />
        </section>
      ))}
    </article>
  );
}

export default Home;
