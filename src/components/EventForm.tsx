import React, { FC, useState } from 'react';
import { rules } from '../utils/rules';

import { IUser } from '../models/IUser';

import { DatePicker, Form, Input, Row, Button, Select } from 'antd';
import { Option } from 'antd/es/mentions';
import { IEvent } from '../models/IEvent';
import { Moment } from 'moment';
import { formatDate } from '../utils/date';
import { useTypedSelector } from '../hooks/useTypedSelector';

interface EventFormProps {
  guests: IUser[];
  submit: (event: IEvent) => void;
}

const EventForm: FC<EventFormProps> = (props) => {
  const [event, setEvent] = useState<IEvent>({
    author: '',
    date: '',
    description: '',
    guest: ''
  } as IEvent)

  const { user } = useTypedSelector(state => state.auth)

  const selectDate = (date: Moment | any) => {
    if (date) setEvent({ ...event, date: formatDate(date.toDate()) })
  }

  const submitForm = () => {
    props.submit({ ...event, author: user.username })
    console.log({ ...event, author: user.username });
  }

  return (
    <Form onFinish={submitForm}>
      <Form.Item
        label='Event description'
        name='description'
        rules={[rules.required('Please input event description!')]}
        style={{marginTop: '20px'}}
      >
        <Input
          onChange={e => setEvent({ ...event, description: e.target.value })}
          value={event.description}
        />
      </Form.Item>
      <Form.Item
        label='Event date'
        name='date'
        rules={[rules.required('Please input event date!'), rules.isDateAfter('You can\'\t make event in the past!')]}
      >
        <DatePicker
          onChange={date => selectDate(date)}
        />
      </Form.Item>
      <Form.Item
        label='Choose guest'
        name='guest'
        rules={[rules.required('Please choose guest!')]}
      >
        <Select onChange={(guest: string) => setEvent({...event, guest})}>
          {props.guests.map(guest =>
            <Select.Option key={guest.username} value={guest.username}> 
              {guest.username}
            </Select.Option>
          )}
        </Select>
      </Form.Item>
      <Row justify='end' style={{marginRight: '20px'}}>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type='primary' htmlType='submit'>
            Create
          </Button>
        </Form.Item>
      </Row>
    </Form>
  )
}

export default EventForm