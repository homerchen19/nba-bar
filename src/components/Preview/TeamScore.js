import React from 'react';
import PropTypes from 'prop-types';
import { Flex } from 'antd-mobile';
import styled from 'styled-components';
import { getMainColor } from 'nba-color';

import { colors } from '../../styles/theme';

const Wrapper = styled(Flex)`
  width: 100%;
  padding: 10px;
  flex: 1;
  /* stylelint-disable-next-line declaration-colon-newline-after */
  background: linear-gradient(
    to right,
    ${props => props.homeColor} 50%,
    ${props => props.visitorColor} 50%
  );
  color: ${colors.white};
`;

const TeamWrapper = styled(Flex)`
  width: 100%;
  padding: 5px 0 10px;
`;

const TeamName = styled.h3`
  line-height: 2em;
`;

const Arena = styled.p`
  margin-top: 5px;
  font-size: 10px;
`;

const Team = ({ team }) => (
  <Flex direction="column">
    <TeamName>{team.name}</TeamName>
    <p>{`${team.w} - ${team.l}`}</p>
  </Flex>
);

const TeamScore = ({ time, arena, city, home, visitor }) => (
  <Wrapper
    justify="start"
    direction="column"
    homeColor={getMainColor(home.name).hex}
    visitorColor={getMainColor(visitor.name).hex}
  >
    <TeamWrapper justify="center">
      <Flex.Item style={{ flex: 2 }}>
        <Team team={home} />
      </Flex.Item>
      <Flex.Item style={{ margin: 0, textAlign: 'center', flex: 1 }}>
        <h5>{time}</h5>
      </Flex.Item>
      <Flex.Item style={{ margin: 0, flex: 2 }}>
        <Team team={visitor} />
      </Flex.Item>
    </TeamWrapper>
    <Arena>{`${arena}, ${city}`}</Arena>
  </Wrapper>
);

Team.propTypes = {
  team: PropTypes.object.isRequired,
};

TeamScore.propTypes = {
  time: PropTypes.string.isRequired,
  arena: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  home: PropTypes.object.isRequired,
  visitor: PropTypes.object.isRequired,
};

export default TeamScore;
