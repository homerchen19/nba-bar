import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import R from 'ramda';
import { Flex, Card, WhiteSpace } from 'antd-mobile';
import styled from 'styled-components';

const Wrapper = styled(Card)`
  width: 100%;
  margin-bottom: 7px;
  padding: 0 !important;
`;

const GameStatus = styled.div`
  width: 100%;
  font-size: small;
  text-align: center;
`;

const TeamContent = styled(Flex)`
  width: 100%;
  margin: 0 0 5px !important;
`;

const TeamName = styled.span`
  color: #000;
  font-weight: 500;
  text-transform: uppercase;
`;

class MatchCard extends Component {
  state = {
    interval: R.ifElse(
      R.equals('1'),
      () => 1200000,
      R.ifElse(R.equals('Halftime'), () => 60000, () => 10000)
    )(this.props.data.periodTime.gameStatus),
  };

  componentDidMount() {
    const { periodTime: { gameStatus } } = this.props.data;

    if (gameStatus !== '3') {
      this.timer = setInterval(this.fetchLiveData, this.state.interval);
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  fetchLiveData = () => {
    const { periodTime: { gameStatus } } = this.props.data;

    if (gameStatus === '3') {
      clearInterval(this.timer);
    } else {
      this.props.updateScheduleDataByGameId();
    }
  };

  render() {
    const { periodTime, home, visitor } = this.props.data;

    return (
      <Fragment>
        <WhiteSpace />
        <Wrapper>
          <Card.Header
            title={
              <GameStatus>
                <span>
                  {periodTime.periodStatus === 'Halftime'
                    ? 'Halftime'
                    : `${periodTime.periodStatus} ${periodTime.gameClock}`}
                </span>
              </GameStatus>
            }
          />
          <Card.Body style={{ cursor: 'pointer' }} onClick={this.props.onClick}>
            <Flex direction="column" align="start">
              <TeamContent align="start" justify="between">
                <TeamName>{home.nickname}</TeamName>
                <span>{home.score === '' ? 0 : home.score}</span>
              </TeamContent>
              <TeamContent align="start" justify="between">
                <TeamName>{visitor.nickname}</TeamName>
                <span>{visitor.score === '' ? 0 : visitor.score}</span>
              </TeamContent>
            </Flex>
          </Card.Body>
        </Wrapper>
      </Fragment>
    );
  }
}

MatchCard.propTypes = {
  data: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.object])
  ).isRequired,
  updateScheduleDataByGameId: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default MatchCard;
