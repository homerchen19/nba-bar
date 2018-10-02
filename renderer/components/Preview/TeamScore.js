import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Flex } from 'antd-mobile';
import styled from 'styled-components';

import { colors } from '../../styles/theme';
import nba from '../../utils/nba';

const Wrapper = styled(Flex)`
  flex: 1;
  width: 100%;
  color: ${colors.white};
`;

const TeamWrapper = styled(Flex)`
  flex: 3;
  width: 100%;
  padding: 3px 0;
  border-top: 1px solid ${colors.white};
  background: linear-gradient(
    to right,
    ${props => props.background.home} 50%,
    ${props => props.background.visitor} 50%
  );
`;

const InfoWrapper = styled(Flex)`
  flex: 2;
  width: 100%;
  padding: 0;
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
        background={{
          home: nba.getTeamBackgroundColor(home.name),
          visitor: nba.getTeamBackgroundColor(visitor.name),
        }}
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
