import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';

import * as actions from './actions';
import Wrapper from '../../components/Wrapper';
import { DateSelector, MatchCard } from '../../components/Home';
import { Spinner } from '../../components/Loader';

const DataSection = styled.section`
  display: flex;
  overflow-y: scroll !important;
  width: 100%;
  margin-top: 30px;
  flex-direction: column;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const NoGame = styled.div`
  display: flex;
  height: 100vh;
  flex-direction: column;
  justify-content: center;
  flex: 1;
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
      history,
      fetchData,
      updateScheduleDataByGameId,
      date,
      loading,
      scheduleData,
    } = this.props;

    return (
      <Wrapper
        currentTab={1}
        history={history}
        schedule={
          <Fragment>
            <DateSelector
              date={date}
              addDay={() => fetchData(date, 'add')}
              subDay={() => fetchData(date, 'sub')}
            />
            <DataSection>
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

                      this.props.history.push(`/${path}/${gameId}`);
                    }}
                    updateScheduleDataByGameId={() =>
                      updateScheduleDataByGameId(date, game.id)
                    }
                  />
                ))}
            </DataSection>
          </Fragment>
        }
      />
    );
  }
}

Home.propTypes = {
  date: PropTypes.number.isRequired,
  fetchData: PropTypes.func.isRequired,
  updateScheduleDataByGameId: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  scheduleData: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = state => ({
  date: state.home.date,
  loading: state.home.loading,
  scheduleData: state.home.scheduleData,
});

export default connect(mapStateToProps, actions)(Home);
