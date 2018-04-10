import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Tabs } from 'antd-mobile';
import styled from 'styled-components';
import R from 'ramda';

import * as actions from './actions';
import Wrapper from '../../components/Wrapper';
import NavBar from '../../components/NavBar';
import { Spinner } from '../../components/Loader';
import {
  TeamScore,
  LineScore,
  Stats,
  BoxScore,
  PlayByPlay,
} from '../../components/Scoreboard';

const DataSection = styled.section`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll !important;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const Item = styled.div`
  width: 100%;
  margin-top: ${props => props.marginTop}px;
  flex: 1 1 auto;
`;

const TabTitle = styled.span`
  font-size: 13px;
  cursor: pointer;
  font-weight: 500;
`;

class Scoreboard extends Component {
  componentDidMount() {
    this.props.fetchData({
      date: this.props.date,
      gameId: this.props.gameData.id,
    });
  }

  render() {
    const {
      history,
      loading,
      gameData,
      gameBoxScoreData,
      gamePlayByPlayData,
    } = this.props;

    return (
      <Wrapper
        currentTab={1}
        history={history}
        schedule={
          <Fragment>
            <NavBar page="SCOREBOARD" />
            <DataSection>
              {loading && <Spinner />}
              {!loading && (
                <Fragment>
                  <Item marginTop="0">
                    <TeamScore
                      arena={gameData.arena}
                      city={gameData.city}
                      home={{
                        name: gameData.home.abbreviation,
                        score: gameData.home.score,
                      }}
                      visitor={{
                        name: gameData.visitor.abbreviation,
                        score: gameData.visitor.score,
                      }}
                      winner={
                        +gameData.home.score > +gameData.visitor.score
                          ? 'home'
                          : 'visitor'
                      }
                      gameStatus="Final"
                    />
                  </Item>
                  <Item marginTop="20">
                    <LineScore
                      home={{
                        name: gameData.home.abbreviation,
                        linescores: gameBoxScoreData.home.linescores.period,
                        score: gameData.home.score,
                      }}
                      visitor={{
                        name: gameData.visitor.abbreviation,
                        linescores: gameBoxScoreData.visitor.linescores.period,
                        score: gameData.visitor.score,
                      }}
                    />
                  </Item>
                  <Item marginTop="20">
                    <Tabs
                      tabs={[
                        { title: <TabTitle>STATS</TabTitle> },
                        { title: <TabTitle>PLAY-BY-PLAY</TabTitle> },
                        { title: <TabTitle>BOX SCORE</TabTitle> },
                      ]}
                      initialPage={0}
                    >
                      <Stats
                        home={{
                          name: gameData.home.abbreviation,
                          stats: gameBoxScoreData.home.stats,
                        }}
                        visitor={{
                          name: gameData.visitor.abbreviation,
                          stats: gameBoxScoreData.visitor.stats,
                        }}
                      />
                      <PlayByPlay gamePlayByPlayData={gamePlayByPlayData} />
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
                    </Tabs>
                  </Item>
                </Fragment>
              )}
            </DataSection>
          </Fragment>
        }
      />
    );
  }
}

Scoreboard.propTypes = {
  fetchData: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  gameData: PropTypes.object.isRequired,
  date: PropTypes.number.isRequired,
  gameBoxScoreData: PropTypes.object.isRequired,
  gamePlayByPlayData: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  loading: state.scoreboard.loading,
  gameData: R.find(R.propEq('id', ownProps.match.params.gameId))(
    state.home.scheduleData
  ),
  date: state.home.date,
  gameBoxScoreData: state.scoreboard.gameBoxScoreData,
  gamePlayByPlayData: state.scoreboard.gamePlayByPlayData,
});

export default connect(mapStateToProps, actions)(Scoreboard);
