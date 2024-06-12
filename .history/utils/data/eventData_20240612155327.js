import axios from 'axios';
import { clientCredentials } from '../client';

const endpoint = clientCredentials.databaseURL;

const getEvents = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/events`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: uid,
    },
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const createEvent = (uid, event) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/events`, {
    method: 'POST',
    headers: {
      Authorization: uid,
    },
    body: JSON.stringify(event),
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getEventById = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/events/${id}`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const updateEvent = (uid, id, eventData) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/events/${id}`, {
    method: 'PUT',
    headers: {
      Authorization: uid,
    },
    body: JSON.stringify(eventData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to update event');
      }
      resolve();
    })
    .catch((error) => {
      reject(error);
    });
});

export const joinEvent = (uid, Id) => {
  const url = `${endpoint}/events/${Id}/signup`;

  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userId: uid }),
  }).then((response) => response.json())
    .then((data) => {
      console.log('Successfully joined the event', data);
      return getEvents(uid); // Refresh the list of events
    });
};

export const leaveEvent = (uid, Id) => {
  const url = `${clientCredentials.databaseURL}/${Id}/leave/`;

  return fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: uid,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to leave event');
      }
      return response.json();
    })
    .then((data) => {
      console.log('Successfully left the event', data);
      return getEvents(); // Refresh the list of events
    })
    .catch((error) => {
      console.error('Error leaving event:', error);
    });
};

const deleteEvent = (eventId, userId) => axios.delete(`/api/events/${eventId}/leave/`, {
  headers: {
    Authorization: userId,
  },
});

// eslint-disable-next-line import/prefer-default-export
export {
  getEvents, createEvent, getEventById, updateEvent, deleteEvent,
};
