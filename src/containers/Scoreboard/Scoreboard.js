import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import R from 'ramda';

import * as actions from './actions';
import Wrapper from '../../components/Wrapper';
import Spinner from '../../components/Spinner';
import {
  Header,
  LineScore,
  BoxScore,
  Stats,
} from '../../components/Scoreboard';

const DataSection = styled.section`
  display: flex;
  width: 100%;
  height: 100%;
  padding-top: 15px;
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

class Scoreboard extends Component {
  componentDidMount() {
    this.props.fetchData(this.props.date, this.props.gameData);
  }

  render() {
    const { loading, gameData, gameBoxScoreData } = this.props;
    console.log(gameBoxScoreData);

    return (
      <Wrapper>
        <Fragment>
          <DataSection>
            {loading && <Spinner />}
            {!loading && (
              <Fragment>
                <Item marginTop="0">
                  <Header
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
                <Item marginTop="30">
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
                <Item marginTop="30">
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
                </Item>
                <Item marginTop="30">
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
                </Item>
              </Fragment>
            )}
            <Link to="/">Back</Link>
          </DataSection>
        </Fragment>
      </Wrapper>
    );
  }
}

Scoreboard.propTypes = {
  fetchData: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  gameData: PropTypes.object.isRequired,
  date: PropTypes.number.isRequired,
  gameBoxScoreData: PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  loading: state.scoreboard.loading,
  gameData: R.find(R.propEq('id', ownProps.match.params.gameId))(
    state.home.scheduleData
  ),
  date: state.home.date,
  gameBoxScoreData: state.scoreboard.gameBoxScoreData,
});

export default connect(mapStateToProps, actions)(Scoreboard);
