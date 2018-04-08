import React from 'react';
import PropTypes from 'prop-types';
import { Flex } from 'antd-mobile';
import styled from 'styled-components';

const Wrapper = styled(Flex)`
  width: 100%;
`;

const TeamWrapper = styled(Flex)`
  width: 100%;
  padding-bottom: 10px;
`;

const ScoreWrapper = styled(Flex)`
  width: 100%;
  padding: 5px 0 20px;
`;

const TeamName = styled.h3`
  line-height: 2em;
`;

const Score = styled.p`
  font-size: large;
  text-align: center;
  font-weight: ${props => (props.win ? '600' : '100')};
  opacity: ${props => (props.win ? '1' : '0.9')};
`;

const TeamScore = ({ arena, city, home, visitor, winner, gameStatus }) => (
  <Wrapper justify="start" direction="column">
    <TeamWrapper justify="center" align="center">
      <Flex.Item style={{ textAlign: 'center' }}>
        <TeamName>{home.name}</TeamName>
      </Flex.Item>
      <Flex.Item style={{ margin: 0, textAlign: 'center' }}>
        <TeamName>{visitor.name}</TeamName>
      </Flex.Item>
    </TeamWrapper>
    <ScoreWrapper justify="center" align="center">
      <Flex.Item style={{ flex: 2 }}>
        <Score win={winner === 'home'}>{home.score}</Score>
      </Flex.Item>
      <Flex.Item style={{ margin: 0, flex: 1, textAlign: 'center' }}>
        <span style={{ fontSize: '0.8em' }}>
          <b>{gameStatus}</b>
        </span>
      </Flex.Item>
      <Flex.Item style={{ margin: 0, flex: 2 }}>
        <Score win={winner === 'visitor'}>{visitor.score}</Score>
      </Flex.Item>
    </ScoreWrapper>
    <span style={{ fontSize: '10px' }}>{`${arena}, ${city}`}</span>
  </Wrapper>
);

TeamScore.propTypes = {
  arena: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  winner: PropTypes.string.isRequired,
  home: PropTypes.object.isRequired,
  visitor: PropTypes.object.isRequired,
  gameStatus: PropTypes.string.isRequired,
};

export default TeamScore;
