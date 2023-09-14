import React, { useState, useEffect } from 'react';
import { useActions } from '../hooks/useActions';
import { useTypedSelector } from '../hooks/useTypedSelector';

import { IEvent } from '../models/IEvent';

import { Layout, Row, Button, Modal } from 'antd';

import EventCalendar from '../components/EventCalendar';
import EventForm from '../components/EventForm';

const Event = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const { guests, events } = useTypedSelector(state => state.event);
  const { fetchGuests, createEvent, fetchEvents } = useActions();
  const { user } = useTypedSelector(state => state.auth);

  useEffect(() => {
    fetchGuests()
    fetchEvents(user.username)
  }, [])

  const addNewEvent = (event: IEvent) => {
    setModalOpen(false);
    createEvent(event)
  }

  return (
    <Layout>
      <EventCalendar events={events} />
      <Row justify='center'>
        <Button
          onClick={() => setModalOpen(true)}
        >
          Add event
        </Button>
      </Row>
      <Modal
        title='Add event'
        open={modalOpen}
        footer={null}
        onCancel={() => setModalOpen(false)}
      >
        <EventForm 
          guests={guests} 
          submit={event => addNewEvent(event)} 
        />
      </Modal>
    </Layout>
  );
};

export default Event;