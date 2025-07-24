import React, { useState, useEffect } from 'react';
import { BASE_URL } from '../config.js';
import EventInfoItem from '../eventInfoItem.js';
import TrainerItem from '../trainerItem.js';

function EventInfo() {
  const [eventsList, setEventsList] = useState({});
  const [participantCount, setParticipantCount] = useState(0);
  const [participants, setParticipants] = useState([]);
  const parameters = new URLSearchParams(window.location.search);
  const eventID = Number(parameters.get('itemId'));

  useEffect(() => {
    fetchEventData(eventID);
    fetchParticipantCount(eventID);
    fetchParticipants(eventID);
  }, [eventID]);

  const fetchEventData = async (id) => {
    const serverUrl = `${BASE_URL}/improve?id=${id}`;
    console.log('Fetching event data:', serverUrl);
    try {
      const response = await fetch(serverUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data.length === 0) {
        console.error("No event found");
      } else {
        console.log('Event data:', data[0]);
        setEventsList(data[0]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchParticipantCount = async (id) => {
    const participantUrl = `${BASE_URL}/api/events/${id}/participants`;
    console.log('Fetching participant count:', participantUrl);
    try {
      const response = await fetch(participantUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Participant count:', data.participantCount);
      setParticipantCount(data.participantCount);
    } catch (error) {
      console.error("Error fetching participant count:", error);
    }
  };

  const fetchParticipants = async (id) => {
    console.log('Fetching participants for event ID:', id);
    try {
      const response = await fetch(`${BASE_URL}/api/registration`);
      const data = await response.json();
      console.log('All participants:', data); // Log all participants
      const filteredParticipants = data.filter(user => user.eventsID === id.toString());
      console.log('Filtered participants:', filteredParticipants);
      setParticipants(filteredParticipants);
    } catch (error) {
      console.error('Error fetching participants:', error);
    }
  };

  return (
    <div>
      <EventInfoItem
      eventID={eventID}
      name={eventsList.title}
      image={eventsList.eventImage}
      price={formatPrice(eventsList.cost)}
      date={formatDate(eventsList.start_date)}
      time={formatTime(eventsList.start_date)}
      endTime={formatTime(eventsList.end_date)}
      participantsNo={participantCount} // Pass the participant count here
      description={eventsList.description}
      registrationLink={eventsList.registration_link}
      participants={participants} // Pass the participants here
    />
    <TrainerItem
      name={eventsList.name}
      image={eventsList.speakerImage}
      speciality={eventsList.speciality}
      description={eventsList.bio}
    />
    </div>
  );
}

function formatPrice(price) {
  if (!price || price === 0) {
    return "FREE";
  } else {
    return "$" + price;
  }
}

function formatDate(dateString) {
  if (!dateString) {
    return "Date TBD";
  }
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
}

function formatTime(dateString) {
  const date = new Date(dateString);
  if (!dateString) {
    return "Finish";
  }
  let hours = date.getHours();
  const ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12;
  return `${hours}${ampm}`;
}

export default EventInfo;
