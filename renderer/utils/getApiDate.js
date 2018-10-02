import startOfDay from 'date-fns/start_of_day';
import getYear from 'date-fns/get_year';
import getMonth from 'date-fns/get_month';
import getDate from 'date-fns/get_date';
import moment from 'moment-timezone';

export default function(date) {
  const targetDate = moment
    .tz(startOfDay(date), 'America/New_York')
    .startOf('day')
    .format();

  return {
    year: getYear(targetDate),
    month: getMonth(targetDate) + 1,
    day: getDate(targetDate),
  };
}
