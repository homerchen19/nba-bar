import React from 'react';
import PropTypes from 'prop-types';
import { Tabs, Flex } from 'antd-mobile';
import styled from 'styled-components';
import { StickyTable, Row, Cell } from 'react-sticky-table';

import 'react-sticky-table/dist/react-sticky-table.css';

const StyledCell = styled(Cell)`
  border: 1px solid #000;
  padding: 6px 5px;
  text-align: center;
`;

const renderHeaderCell = () => {
  const cells = [
    'Player',
    'MIN',
    'PTS',
    'REB',
    'AST',
    'STL',
    'BLK',
    'FG',
    '3P',
    'FT',
    'TO',
    '+/-',
  ];

  return cells.map(cell => <StyledCell key={cell}>{cell}</StyledCell>);
};

const renderTeamBoxScoreTable = team => (
  <StickyTable>
    <Row key="header">{renderHeaderCell()}</Row>
    {team.players.map(player => (
      <Row key="player">
        <StyledCell key="Player" style={{ textAlign: 'left' }}>
          {player.last_name}
        </StyledCell>
        <StyledCell key="MIN">{player.minutes}</StyledCell>
        <StyledCell key="PTS">{player.points}</StyledCell>
        <StyledCell key="REB">
          {+player.rebounds_defensive + +player.rebounds_offensive}
        </StyledCell>
        <StyledCell key="AST">{player.assists}</StyledCell>
        <StyledCell key="STL">{player.steals}</StyledCell>
        <StyledCell key="BLK">{player.blocks}</StyledCell>
        <StyledCell key="FG">
          {`${player.field_goals_made}-${player.field_goals_attempted}`}
        </StyledCell>
        <StyledCell key="3P">
          {`${player.three_pointers_made}-${player.three_pointers_attempted}`}
        </StyledCell>
        <StyledCell key="FT">
          {`${player.free_throws_made}-${player.free_throws_attempted}`}
        </StyledCell>
        <StyledCell key="TOV">{player.turnovers}</StyledCell>
        <StyledCell key="+/-">{player.plus_minus}</StyledCell>
      </Row>
    ))}
  </StickyTable>
);

const Boxscore = ({ home, visitor }) => (
  <Tabs
    tabs={[
      {
        title: home.name,
      },
      {
        title: visitor.name,
      },
    ]}
    initalPage="1"
  >
    <Flex justify="start" key="home">
      <Flex.Item>{renderTeamBoxScoreTable(home)}</Flex.Item>
    </Flex>
    <Flex justify="start" key="visitor">
      <Flex.Item>{renderTeamBoxScoreTable(visitor)}</Flex.Item>
    </Flex>
  </Tabs>
);

Boxscore.propTypes = {
  home: PropTypes.object.isRequired,
  visitor: PropTypes.object.isRequired,
};

export default Boxscore;
