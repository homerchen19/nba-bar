import React, { useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import { connect } from 'react-redux';
import styled from 'styled-components';

import Wrapper from '@components/Wrapper';
import { DateSelector, MatchCard } from '@components/Home';
import { Spinner } from '@components/Loader';
import { DataSection } from '@components/shared';
import * as actions from './actions';

const NoGame = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  text-align: center;
`;

const getPath = gameStatus => {
  switch (gameStatus) {
    default:
    case '1':
      return 'preview';
    case 'Halftime':
    case '2':
      return 'live';
    case '3':
      return 'scoreboard';
  }
};

const handleMatchCardClick = game => () => {
  const path = getPath(game.periodTime.gameStatus);

  Router.push({
    pathname: `/${path}`,
    query: { gameId: `${game.id}` },
  });
};

const Home = ({
  fetchData,
  updateScheduleDataByGameId,
  date,
  loading,
  scheduleData,
}) => {
  useLayoutEffect(() => fetchData(date, 'today'), []);

  return (
    <Wrapper currentTab={1}>
      <>
        <DateSelector
          date={date}
          addDay={() => fetchData(date, 'add')}
          subDay={() => fetchData(date, 'sub')}
        />
        <DataSection style={{ height: 'auto', marginTop: '30px' }}>
          {loading && <Spinner />}
          {!loading &&
            scheduleData.length === 0 && (
              <NoGame>
                <h3>No games available for this date</h3>
              </NoGame>
            )}
          {!loading &&
            scheduleData.length !== 0 &&
            scheduleData.map(game => (
              <MatchCard
                key={game.id}
                data={game}
                onClick={handleMatchCardClick(game)}
                updateScheduleDataByGameId={() =>
                  updateScheduleDataByGameId(date, game.id)
                }
              />
            ))}
        </DataSection>
      </>
    </Wrapper>
  );
};

Home.propTypes = {
  date: PropTypes.number.isRequired,
  fetchData: PropTypes.func.isRequired,
  updateScheduleDataByGameId: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  scheduleData: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = state => ({
  date: state.home.date,
  loading: state.home.loading,
  scheduleData: state.home.scheduleData,
});

export default connect(
  mapStateToProps,
  actions
)(Home);
