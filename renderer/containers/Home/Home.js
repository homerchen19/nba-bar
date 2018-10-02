import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import { connect } from 'react-redux';
import styled from 'styled-components';

import * as actions from './actions';
import Wrapper from '../../components/Wrapper';
import { DateSelector, MatchCard } from '../../components/Home';
import { Spinner } from '../../components/Loader';
import { DataSection } from '../../components/shared';

const NoGame = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  text-align: center;
`;

class Home extends Component {
  componentDidMount() {
    this.props.fetchData(this.props.date, 'today');
  }

  getPath = gameStatus => {
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

  render() {
    const {
      fetchData,
      updateScheduleDataByGameId,
      date,
      loading,
      scheduleData,
    } = this.props;

    return (
      <Wrapper currentTab={1}>
        <Fragment>
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
                  onClick={() => {
                    const gameId = game.id;
                    const path = this.getPath(game.periodTime.gameStatus);

                    Router.push({
                      pathname: `/${path}`,
                      query: { gameId: `${gameId}` },
                    });
                  }}
                  updateScheduleDataByGameId={() =>
                    updateScheduleDataByGameId(date, game.id)
                  }
                />
              ))}
          </DataSection>
        </Fragment>
      </Wrapper>
    );
  }
}

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
