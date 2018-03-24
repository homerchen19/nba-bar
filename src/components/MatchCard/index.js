import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Flex, Card, WhiteSpace } from 'antd-mobile';
import styled from 'styled-components';

const Wrapper = styled(Card)`
  width: 100%;
  padding: 0 !important;
  margin-bottom: 7px;
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
                  {`${periodTime.periodStatus} ${periodTime.gameClock}`}
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
  onClick: PropTypes.func.isRequired,
};

export default MatchCard;
