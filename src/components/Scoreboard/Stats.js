import React from 'react';
import PropTypes from 'prop-types';
import { Flex } from 'antd-mobile';
import styled from 'styled-components';
import { StickyTable, Row, Cell } from 'react-sticky-table';

const Wrapper = styled(Flex)`
  width: 100%;
  padding: 5px 0;
  background: #fff;
`;

const StyledCell = styled(Cell)`
  padding: 8px 26px;
  text-align: center;
`;

const teamStatsKeys = {
  'FG%': 'field_goals_percentage',
  '3P%': 'three_pointers_percentage',
  'FT%': 'free_throws_percentage',
  AST: 'assists',
  REB: '',
  STL: 'steals',
  BLK: 'blocks',
  TOV: 'turnovers',
  FOUL: 'fouls',
};

const reanderStatsRow = (homeStats, visitorStats) =>
  Object.keys(teamStatsKeys).map(key => (
    <Row key={key}>
      <StyledCell key="home">
        {key === 'REB'
          ? +homeStats.rebounds_offensive + +homeStats.rebounds_defensive
          : homeStats[teamStatsKeys[key]]}
      </StyledCell>
      <StyledCell key="item">
        <b>{key}</b>
      </StyledCell>
      <StyledCell key="visitor">
        {key === 'REB'
          ? +visitorStats.rebounds_offensive + +visitorStats.rebounds_defensive
          : visitorStats[teamStatsKeys[key]]}
      </StyledCell>
    </Row>
  ));

const Stats = ({ home, visitor }) => (
  <Wrapper justify="center">
    <StickyTable stickyColumnCount={0}>
      <Row key="header">
        <StyledCell key="home">
          <b>{home.name}</b>
        </StyledCell>
        <StyledCell />
        <StyledCell key="visitor">
          <b>{visitor.name}</b>
        </StyledCell>
      </Row>
      {reanderStatsRow(home.stats, visitor.stats)}
    </StickyTable>
  </Wrapper>
);

Stats.propTypes = {
  home: PropTypes.object.isRequired,
  visitor: PropTypes.object.isRequired,
};

export default Stats;
