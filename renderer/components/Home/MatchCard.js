import React, { Component } from 'react';
import PropTypes from 'prop-types';
import R from 'ramda';
import { Flex, Card } from 'antd-mobile';
import styled from 'styled-components';

import { colors } from '@styles/theme';
import nba from '@utils/nba';

const Wrapper = styled(Card)`
  flex: 1 0;
  width: 100%;
  margin: 5px 0;
  padding: 0 !important;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
  transition: box-shadow 0.2s ease-in-out, transform 0.2s ease;
  cursor: pointer;

  &:hover {
    box-shadow: 0 3px 4px rgba(0, 0, 0, 0.3);
    transform: translate3d(0, -3px, 3px);
  }
`;

const CardHeader = styled(Card.Header)`
  flex: 1 0 !important;
  padding: 6px 0 !important;
`;

const CardBody = styled(Card.Body)`
  flex: 1 0 !important;
  padding: 0 !important;
`;

const CardFooter = styled(Card.Footer)`
  flex: 1 0 !important;
  padding: 0 !important;
  border-top: 1px solid ${colors.white};
`;

const Footer = styled.div`
  flex: 1 0;
  width: 100%;
  padding: 4px 0 !important;
  color: ${colors.black};
  text-align: center;
`;

const GameStatus = styled.div`
  width: 100%;
  color: ${colors.black};
  font-size: small;
  font-weight: 400;
  text-align: center;
`;

const TeamContent = styled(Flex)`
  flex: 1 0;
  width: 100%;
  padding: 8px 15px;
  border-bottom: 1px solid ${colors.white};
  opacity: 0.95;
  background: linear-gradient(
    to right,
    ${props => props.background} 80%,
    #fff 20%
  );
`;

const TeamName = styled.span`
  color: #fff;
  font-weight: 400;
  text-transform: uppercase;
`;

const TeamScore = styled.span`
  opacity: ${props => (props.winner ? 1 : 0.8)};
  color: ${colors.black};
  font-weight: ${props => (props.winner ? 600 : 200)};
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
    const {
      periodTime: { gameStatus },
    } = this.props.data;

    if (gameStatus !== '3') {
      this.timer = setInterval(this.fetchLiveData, this.state.interval);
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  fetchLiveData = () => {
    const {
      periodTime: { gameStatus },
    } = this.props.data;

    if (gameStatus === '3') {
      clearInterval(this.timer);
    } else {
      this.props.updateScheduleDataByGameId();
    }
  };

  renderFooter = () => {
    const { home, visitor, playoffs } = this.props.data;
    const { home_wins: homeWins, visitor_wins: visitorWins } = playoffs;

    let seriesScore = `Series tied ${homeWins}-${visitorWins}`;

    if (+homeWins > +visitorWins) {
      seriesScore = `${home.nickname} leads ${homeWins}-${visitorWins}`;
    } else if (+homeWins < +visitorWins) {
      seriesScore = `${visitor.nickname} leads ${visitorWins}-${homeWins}`;
    }

    return (
      <Footer>
        <p>{seriesScore}</p>
      </Footer>
    );
  };

  render() {
    const { periodTime, home, visitor, playoffs } = this.props.data;
    let winner = 'draw';

    if (home.score !== visitor.score) {
      winner = +home.score > +visitor.score ? 'home' : 'visitor';
    }

    return (
      <Wrapper onClick={this.props.onClick}>
        <CardHeader
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
        <CardBody>
          <TeamContent
            align="center"
            justify="between"
            background={nba.getTeamBackgroundColor(home.team_key)}
          >
            <TeamName>{home.nickname}</TeamName>
            <TeamScore winner={winner === 'home'}>
              {home.score === '' ? 0 : home.score}
            </TeamScore>
          </TeamContent>
          <TeamContent
            align="center"
            justify="between"
            background={nba.getTeamBackgroundColor(visitor.team_key)}
            style={{
              borderBottom: 0,
              borderRadius: !playoffs && '0 0 10px',
            }}
          >
            <TeamName>{visitor.nickname}</TeamName>
            <TeamScore winner={winner === 'visitor'}>
              {visitor.score === '' ? 0 : visitor.score}
            </TeamScore>
          </TeamContent>
          {}
        </CardBody>
        {playoffs && <CardFooter content={this.renderFooter()} />}
      </Wrapper>
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
