import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getEventById } from '../../../utils/data/eventData';
import EventForm from '../../../components/event/EventForm';

export default function EditGame() {
  const router = useRouter();
  const { id } = router.query;
  const [event, setEvent] = useState(null);

  useEffect(() => {
    if (id) {
      getEventById(id).then((data) => {
        setEvent(data);
      });
    }
  }, [id]);

  if (!event) {
    return <div>Loading...</div>;
  }

  return <EventForm initialGame={event} />;
}
