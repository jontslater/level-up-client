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
  fetch(`${clientCredentials.databaseURL}/events`, {
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

const joinEvent = (eventId) => {
  const uid = localStorage.getItem('uid'); // Assuming UID is stored in local storage
  const url = `${clientCredentials.databaseURL}/events/${eventId}/join/`; // Adjust the URL as per your API endpoint

  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: uid, // Pass UID directly without 'Bearer' or 'Token'
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to join event');
      }
      return response.json();
    })
    .then((data) => {
      console.log('Successfully joined the event', data);
      return getEvents(); // Refresh the list of events
    })
    .catch((error) => {
      console.error('Error joining event:', error);
    });
};

const leaveEvent = (eventId) => {
  const uid = localStorage.getItem('uid'); // Assuming UID is stored in local storage
  const url = `${clientCredentials.databaseURL}/${eventId}/leave/`; // Adjust the URL as per your API endpoint

  return fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: uid, // Pass UID directly without 'Bearer' or 'Token'
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
  getEvents, createEvent, getEventById, updateEvent, deleteEvent, joinEvent, leaveEvent,
};
