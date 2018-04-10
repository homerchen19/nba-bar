import React from 'react';
import PropTypes from 'prop-types';
import { Flex } from 'antd-mobile';
import styled from 'styled-components';
import { getMainColor } from 'nba-color';

import { BarLoader } from '../Loader';
import { colors } from '../../styles/theme';

const Wrapper = styled(Flex)`
  width: 100%;
  color: #fff;
`;

const InfoWrapper = styled(Flex)`
  width: 100%;
  padding: 0 0 5px;
  background: ${colors.darkBlue};
`;

const ScoreWrapper = styled(Flex)`
  width: 100%;
  padding: 3px 0 6px;
  border-top: 1px solid ${colors.white};
  background: linear-gradient(
    to right,
    ${props => props.background.home} 50%,
    ${props => props.background.visitor} 50%
  );
`;

const Team = styled(Flex)`
  margin: 0;
  flex: 1;
`;

const TeamName = styled.h3`
  line-height: 35px;
`;

const Score = styled.p`
  font-size: large;
  text-align: center;
  font-weight: ${props => (props.win ? '600' : '100')};
  opacity: ${props => (props.win ? '1' : '0.9')};
`;

const TeamScore = ({
  arena,
  city,
  home,
  visitor,
  winner,
  gameStatus,
  showBarLoader,
}) => (
  <Wrapper justify="start" direction="column">
    <InfoWrapper direction="column" justify="center" align="center">
      <Flex.Item style={{ textAlign: 'center' }}>
        <h4>{gameStatus}</h4>
      </Flex.Item>
      <Flex.Item style={{ margin: 0, textAlign: 'center' }}>
        <span style={{ fontSize: '10px' }}>{`${arena}, ${city}`}</span>
      </Flex.Item>
    </InfoWrapper>
    {showBarLoader && <BarLoader />}
    <ScoreWrapper
      justify="center"
      align="center"
      background={{
        home: getMainColor(home.name).hex,
        visitor: getMainColor(visitor.name).hex,
      }}
    >
      <Team direction="column" justify="center" align="center">
        <TeamName>{home.name}</TeamName>
        <Score win={winner === 'home'}>{home.score}</Score>
      </Team>
      <Team direction="column" justify="center" align="center">
        <TeamName>{visitor.name}</TeamName>
        <Score win={winner === 'visitor'}>{visitor.score}</Score>
      </Team>
    </ScoreWrapper>
  </Wrapper>
);

TeamScore.propTypes = {
  arena: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  winner: PropTypes.string.isRequired,
  home: PropTypes.object.isRequired,
  visitor: PropTypes.object.isRequired,
  gameStatus: PropTypes.string.isRequired,
  showBarLoader: PropTypes.bool,
};

TeamScore.defaultProps = {
  showBarLoader: false,
};

export default TeamScore;
