import moment, { Moment } from 'moment';
import { Dayjs } from 'dayjs';

export const rules = {
  required: (message: string) => ({
    required: true,
    message,
  }),
  isDateAfter: (message: string) => () => ({
    validator(_: any, value: Dayjs) {
        if (value.isAfter(Date.now()) || value.isSame(Date.now())) {
            return Promise.resolve()
        }
        return Promise.reject(new Error(message));
    }
  })
}