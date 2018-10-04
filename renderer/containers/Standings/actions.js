import R from 'ramda';
import getYear from 'date-fns/get_year';
import getMonth from 'date-fns/get_month';

import nba from '@utils/nba';
import { REQUEST_START, REQUEST_SUCCESS, REQUEST_ERROR } from './constants';

const requestStart = () => ({ type: REQUEST_START });
const requestError = () => ({ type: REQUEST_ERROR });
const requestSuccess = payload => ({
  type: REQUEST_SUCCESS,
  payload,
});

const pickEssentialProps = (team, allTeams) =>
  R.map(
    R.compose(
      teamData =>
        R.assoc(
          'name',
          R.prop(
            'tricode',
            R.find(R.propEq('teamId', teamData.teamId))(allTeams)
          )
        )(teamData),
      R.pick(['teamId', 'win', 'loss', 'winPct', 'gamesBehind'])
    )
  )(team);

const getCorrectYear = date => {
  const year = getYear(date);
  const month = getMonth(date);

  return month > 9 ? year : year - 1;
};

export const fetchData = () => async (dispatch, getState) => {
  dispatch(requestStart());

  try {
    const conferenceStandings = await nba.conferenceStandings({
      date: 'current',
    });

    const {
      home: { date },
    } = getState();

    const {
      league: { standard: allTeams },
    } = await nba.teams({
      year: getCorrectYear(date),
    });

    const { east: eastStandingsData, west: westStandingsData } = R.path(
      ['league', 'standard', 'conference'],
      conferenceStandings
    );

    const standingsData = {
      east: pickEssentialProps(eastStandingsData, allTeams),
      west: pickEssentialProps(westStandingsData, allTeams),
    };

    dispatch(requestSuccess({ standingsData }));
  } catch (error) {
    dispatch(requestError());
  }
};
