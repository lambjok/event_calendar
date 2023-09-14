import React, { FC, ReactNode } from 'react';

import { Moment } from 'moment';

import { Badge, Calendar } from 'antd';
import { IEvent } from '../models/IEvent';
import { formatDate } from '../utils/date';
import { Dayjs } from 'dayjs';

interface EventCalendarProps {
  events: IEvent[];
}

const EventCalendar: FC<EventCalendarProps> = (props) => {
  function dateCellRender(date: Dayjs): ReactNode {
    const formatedDate = formatDate(date.toDate());
    const currentDayEvents = props.events.filter(ev => ev.date === formatedDate)
    return (
      <div>
        {currentDayEvents.map((ev, i) =>
          <div key={i}>{ev.description}</div>
        )}
      </div>
    )
  }
  return (
    <Calendar
      cellRender={dateCellRender}
    />
  )
}

export default EventCalendar