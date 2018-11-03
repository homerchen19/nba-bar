import { DateTime } from 'luxon';
import getTime from 'date-fns/get_time';

import getApiDate from '../getApiDate';

const getDateByZone = zone =>
  DateTime.fromObject({
    year: 2018,
    month: 10,
    day: 31,
    hour: 10,
    minute: 0,
    second: 0,
    zone,
  }).toISO();

describe('getApiDate', () => {
  it('should exist', () => {
    expect(getApiDate).toBeDefined();
  });

  it('should work fine in GMT+08:00', () => {
    const date = getDateByZone('Asia/Taipei');

    expect(date).toBe('2018-10-31T10:00:00.000+08:00');
    expect(getApiDate(getTime(date))).toEqual({
      day: 30,
      month: 10,
      year: 2018,
    });
  });

  it('should work fine in GMT+00:00', () => {
    const date = getDateByZone('Europe/London');

    expect(date).toBe('2018-10-31T10:00:00.000+00:00');
    expect(getApiDate(getTime(date))).toEqual({
      day: 30,
      month: 10,
      year: 2018,
    });
  });

  it('should work fine in GMT-07:00', () => {
    const date = getDateByZone('America/Los_Angeles');

    expect(date).toBe('2018-10-31T10:00:00.000-07:00');
    expect(getApiDate(getTime(date))).toEqual({
      day: 31,
      month: 10,
      year: 2018,
    });
  });
});
