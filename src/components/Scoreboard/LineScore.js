import React from 'react';
import PropTypes from 'prop-types';
import { Flex } from 'antd-mobile';
import styled from 'styled-components';
import { StickyTable, Row, Cell } from 'react-sticky-table';
import { getMainColor } from 'nba-color';
import 'react-sticky-table/dist/react-sticky-table.css';

const Wrapper = styled(Flex)`
  width: 100%;
`;

const StyledCell = styled(Cell)`
  border: 1px solid #000;
  padding: 6px 10px;
  text-align: center;
`;

const TeamName = styled.p`
  color: #fff;
  font-weight: 500;
`;

const reanderTeamRow = team => (
  <Row key={team.name}>
    <StyledCell
      key="name"
      style={{ backgroundColor: getMainColor(team.name).hex }}
    >
      <TeamName>{team.name}</TeamName>
    </StyledCell>
    {team.linescores.map(period => (
      <StyledCell key={period.period_value}>{period.score}</StyledCell>
    ))}
    <StyledCell key="score">{team.score}</StyledCell>
  </Row>
);

const LineScore = ({ home, visitor }) => (
  <Wrapper justify="center">
    <StickyTable stickyHeaderCount={0}>
      <Row key="header">
        <StyledCell key="name" />
        {home.linescores.map(period => (
          <StyledCell key={period.period_value}>
            <b>{period.period_name}</b>
          </StyledCell>
        ))}
        <StyledCell key="total">
          <b>T</b>
        </StyledCell>
      </Row>
      {reanderTeamRow(home)}
      {reanderTeamRow(visitor)}
    </StickyTable>
  </Wrapper>
);

LineScore.propTypes = {
  home: PropTypes.object.isRequired,
  visitor: PropTypes.object.isRequired,
};

export default LineScore;
