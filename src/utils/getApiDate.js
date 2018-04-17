import startOfDay from 'date-fns/start_of_day';
import getTime from 'date-fns/get_time';
import moment from 'moment-timezone';

export default function(date) {
  return getTime(
    moment
      .tz(startOfDay(date), 'America/New_York')
      .startOf('day')
      .format()
  );
}
