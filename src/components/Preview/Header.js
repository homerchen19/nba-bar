import React from 'react';
import PropTypes from 'prop-types';
import { Flex } from 'antd-mobile';
import styled from 'styled-components';
import parse from 'date-fns/parse';
import format from 'date-fns/format';

const formatDate = date => format(parse(date), 'DD, MMM, YYYY');

const Wrapper = styled(Flex)`
  width: 100%;
  flex: 1;
`;

const TimeWrapper = styled(Flex)`
  width: 100%;
  padding-bottom: 10px;
  border-bottom: 1px solid #000;
`;

const TeamWrapper = styled(Flex)`
  width: 100%;
  padding: 5px 0 10px;
`;

const TeamName = styled.h3`
  line-height: 2em;
`;

const Team = ({ team }) => (
  <Flex direction="column">
    <TeamName>{team.name}</TeamName>
    <p>{`${team.w} - ${team.l}`}</p>
  </Flex>
);

const Header = ({ date, time, arena, city, home, visitor }) => (
  <Wrapper justify="start" direction="column">
    <TimeWrapper justify="center">
      <Flex.Item>
        <Flex direction="column">
          <h6>{formatDate(date)}</h6>
          <h4>{time}</h4>
        </Flex>
      </Flex.Item>
    </TimeWrapper>
    <TeamWrapper justify="center">
      <Flex.Item>
        <Team team={home} />
      </Flex.Item>
      <Flex.Item>
        <Team team={visitor} />
      </Flex.Item>
    </TeamWrapper>
    <span style={{ fontSize: '0.6rem' }}>{`${arena}, ${city}`}</span>
  </Wrapper>
);

Team.propTypes = {
  team: PropTypes.object.isRequired,
};

Header.propTypes = {
  date: PropTypes.number.isRequired,
  time: PropTypes.string.isRequired,
  arena: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  home: PropTypes.object.isRequired,
  visitor: PropTypes.object.isRequired,
};

export default Header;
