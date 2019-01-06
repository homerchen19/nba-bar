import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import R from 'ramda';

import Wrapper from '@components/Wrapper';
import Tab from '@components/Tab';
import NavBar from '@components/NavBar';
import { Spinner, Error } from '@components/Loader';
import {
  TeamScore,
  LineScore,
  BoxScore,
  PlayByPlay,
} from '@components/Scoreboard';
import { DataSection } from '@components/shared';
import * as actions from './actions';

const INTERVAL = 5000;

const Item = styled.div`
  flex: 1 1 auto;
  width: 100%;
  margin-top: ${props => props.marginTop}px;
`;

const Live = ({
  fetchData,
  date,
  error,
  live,
  loading,
  gameData,
  gameBoxScoreData,
  gamePlayByPlayData,
}) => {
  let timer;

  const fetchLiveData = () => {
    const lastPlay = R.last(gamePlayByPlayData);
    const isFinal =
      (lastPlay.period === '4' || +lastPlay.period > 4) &&
      lastPlay.description === 'End Period' &&
      lastPlay.home_score !== lastPlay.visitor_score;

    if (isFinal) {
      clearInterval(timer);
    } else {
      fetchData({
        date,
        gameId: gameData.id,
        firstCall: false,
      });
    }
  };

  useEffect(() => {
    fetchData({
      date,
      gameId: gameData.id,
      firstCall: true,
    });
  }, []);

  useEffect(() => {
    timer = setInterval(fetchLiveData, INTERVAL);

    return () => clearInterval(timer);
  });

  let gameClock = '';

  if (!loading) {
    gameClock =
      gameBoxScoreData.periodTime.gameClock === '0.0'
        ? ''
        : ` ${gameBoxScoreData.periodTime.gameClock}`;
  }

  return (
    <Wrapper currentTab={1}>
      <>
        <NavBar page="LIVE" />
        <DataSection>
          {loading && <Spinner />}
          {error && <Error />}
          {!error && !loading && (
            <>
              <Item marginTop="0">
                <TeamScore
                  arena={gameData.arena}
                  city={gameData.city}
                  home={{
                    name: gameData.home.abbreviation,
                    score: gameBoxScoreData.home.score,
                  }}
                  visitor={{
                    name: gameData.visitor.abbreviation,
                    score: gameBoxScoreData.visitor.score,
                  }}
                  winner={
                    +gameBoxScoreData.home.score >
                    +gameBoxScoreData.visitor.score
                      ? 'home'
                      : 'visitor'
                  }
                  gameStatus={`${
                    gameBoxScoreData.periodTime.periodStatus
                  }${gameClock}`}
                  showBarLoader={live !== 'error'}
                />
              </Item>
              <Item marginTop="20">
                <LineScore
                  home={{
                    name: gameData.home.abbreviation,
                    linescores: Array.isArray(
                      gameBoxScoreData.home.linescores.period
                    )
                      ? gameBoxScoreData.home.linescores.period
                      : [gameBoxScoreData.home.linescores.period],
                    score: gameBoxScoreData.home.score,
                  }}
                  visitor={{
                    name: gameData.visitor.abbreviation,
                    linescores: Array.isArray(
                      gameBoxScoreData.visitor.linescores.period
                    )
                      ? gameBoxScoreData.visitor.linescores.period
                      : [gameBoxScoreData.visitor.linescores.period],
                    score: gameBoxScoreData.visitor.score,
                  }}
                />
              </Item>
              <Item marginTop="20">
                <Tab titles={['PLAY-BY-PLAY', 'BOX SCORE']}>
                  <PlayByPlay
                    gamePlayByPlayData={R.reverse(gamePlayByPlayData)}
                  />
                  <BoxScore
                    home={{
                      name: gameData.home.abbreviation,
                      players: gameBoxScoreData.home.players.player,
                    }}
                    visitor={{
                      name: gameData.visitor.abbreviation,
                      players: gameBoxScoreData.visitor.players.player,
                    }}
                  />
                </Tab>
              </Item>
            </>
          )}
        </DataSection>
      </>
    </Wrapper>
  );
};

Live.propTypes = {
  fetchData: PropTypes.func.isRequired,
  live: PropTypes.oneOf(['loading', 'success', 'error']).isRequired,
  error: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  gameData: PropTypes.object.isRequired,
  date: PropTypes.number.isRequired,
  gameBoxScoreData: PropTypes.object.isRequired,
  gamePlayByPlayData: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  live: state.live.live,
  error: state.live.error,
  loading: state.live.loading,
  gameData: R.find(R.propEq('id', ownProps.router.query.gameId))(
    state.home.scheduleData
  ),
  date: state.home.date,
  gameBoxScoreData: state.live.gameBoxScoreData,
  gamePlayByPlayData: state.live.gamePlayByPlayData,
});

export default connect(
  mapStateToProps,
  actions
)(Live);
