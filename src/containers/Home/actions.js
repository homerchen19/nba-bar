import { ADD_DAY, SUB_DAY } from './constants';

export const addDay = date => ({ type: ADD_DAY, payload: { date } });
export const subDay = date => ({ type: SUB_DAY, payload: { date } });
