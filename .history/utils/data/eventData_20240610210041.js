import axios from 'axios';
import { clientCredentials } from '../client';

const getEvents = (uid) => fetch('/events', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    Authorization: uid, // Assuming uid is the UID value
  },
})
  .then((response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then((data) => data)
  .catch((error) => {
    console.error('There was a problem with your fetch operation:', error);
    return null;
  });

const createEvent = (event) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/events`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
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

const updateEvent = (id, eventData) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/events/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
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

// const deleteEvent = (id) => new Promise((resolve, reject) => {
//   fetch(`${clientCredentials.databaseURL}/events/${id}`, {

//     method: 'DELETE',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   })
//     .then((data) => resolve((data)))
//     .catch(reject);
// });

const deleteEvent = (eventId, userId) => axios.delete(`/api/events/${eventId}/leave/`, {
  headers: {
    Authorization: userId,
  },
});

const uid = 'Your_UID_Value_Here'; // Replace with the actual UID value
getEvents(uid).then((events) => {
  console.log(events);
});

// eslint-disable-next-line import/prefer-default-export
export {
  getEvents, createEvent, getEventById, updateEvent, deleteEvent,
};
