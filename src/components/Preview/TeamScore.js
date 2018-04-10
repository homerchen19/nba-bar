import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Flex } from 'antd-mobile';
import styled from 'styled-components';
import { getMainColor } from 'nba-color';

import { colors } from '../../styles/theme';

const Wrapper = styled(Flex)`
  width: 100%;
  flex: 1;
  color: ${colors.white};
`;

const TeamWrapper = styled(Flex)`
  width: 100%;
  padding: 3px 0;
  border-top: 1px solid ${colors.white};
  flex: 3;
  background: linear-gradient(
    to right,
    ${props => props.homeColor} 50%,
    ${props => props.visitorColor} 50%
  );
`;

const InfoWrapper = styled(Flex)`
  width: 100%;
  padding: 0;
  flex: 2;
  background: ${colors.darkBlue};
`;

const TeamName = styled.h3`
  line-height: 25px;
`;

const Arena = styled.p`
  margin-top: 4px;
  font-size: 9px;
`;

const Team = ({ team }) => (
  <Flex direction="column">
    <TeamName>{team.name}</TeamName>
    <p>{`${team.w} - ${team.l}`}</p>
  </Flex>
);

const TeamScore = ({ time, arena, city, home, visitor }) => (
  <Fragment>
    <Wrapper justify="start" direction="column">
      <InfoWrapper direction="column">
        <h4>{time}</h4>
        <Arena>{`${arena}, ${city}`}</Arena>
      </InfoWrapper>
      <TeamWrapper
        justify="center"
        homeColor={getMainColor(home.name).hex}
        visitorColor={getMainColor(visitor.name).hex}
      >
        <Flex.Item>
          <Team team={home} />
        </Flex.Item>
        <Flex.Item style={{ margin: 0 }}>
          <Team team={visitor} />
        </Flex.Item>
      </TeamWrapper>
    </Wrapper>
  </Fragment>
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
