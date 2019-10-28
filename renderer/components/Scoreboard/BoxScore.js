import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Flex } from 'antd-mobile';
import styled from 'styled-components';
import { StickyTable, Row, Cell } from 'react-sticky-table';

import { colors } from '@styles/theme';
import nba from '@utils/nba';

const Wrapper = styled(Flex)`
  width: 100%;
  height: 300px;
  overflow-y: scroll !important;

  > .am-tabs * {
    box-sizing: content-box;
  }
`;

const HeaderCell = styled(Cell)`
  padding: 6px;
  background: ${colors.blue};
  color: #fff;
  text-align: center;
`;

const StyledCell = styled(Cell)`
  padding: 6px;
  border-bottom: 1px solid ${colors.white};
  background: #fff;
  text-align: center;
`;

const Button = styled.button`
  width: 30%;
  height: 28px;
  margin: 8px 0;
  border: 1px solid ${colors.white};
  opacity: 1;
  background-color: ${props =>
    props.selected ? props.background : colors.white} !important;
  color: ${props => (props.selected ? '#fff' : colors.black)} !important;
  transition: all ease 0.2s;
  cursor: pointer;

  & :hover {
    ${props =>
      props.selected
        ? 'opacity: 0.9;'
        : `
    color: ${colors.white} !important;
    background-color: ${props.background} !important;
    `};
  }
`;

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

const renderHeaderCell = () =>
  cells.map(cell => (
    <HeaderCell key={cell}>
      <b>{cell}</b>
    </HeaderCell>
  ));

const renderTeamBoxScoreTable = team => (
  <StickyTable>
    <Row key="header">{renderHeaderCell()}</Row>

    {team.players.map(player => (
      <Row key={`${player.first_name}${player.last_name}`}>
        <StyledCell
          key="Player"
          style={{
            borderRight: `1px solid ${colors.white}`,
            textAlign: 'left',
            fontWeight: '500',
          }}
        >
          {player.last_name === '' ? player.first_name : player.last_name}
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

class Boxscore extends Component {
  state = {
    team: this.props.home,
    selected: 'home',
  };

  toggleTeam = (team, selected) => {
    this.setState({
      team,
      selected,
    });
  };

  render() {
    const { team, selected } = this.state;
    const { home, visitor } = this.props;

    return (
      <Fragment>
        <Flex justify="center" style={{ background: '#fff' }}>
          <Button
            selected={selected === 'home'}
            background={nba.getTeamBackgroundColor(home.name)}
            onClick={() => {
              this.toggleTeam(home, 'home');
            }}
            style={{
              borderRadius: '5px 0 0 5px',
            }}
          >
            {home.name}
          </Button>
          <Button
            selected={selected === 'visitor'}
            background={nba.getTeamBackgroundColor(visitor.name)}
            onClick={() => {
              this.toggleTeam(visitor, 'visitor');
            }}
            style={{
              borderRadius: '0 5px 5px 0',
            }}
          >
            {visitor.name}
          </Button>
        </Flex>
        <Wrapper>{renderTeamBoxScoreTable(team)}</Wrapper>
      </Fragment>
    );
  }
}

Boxscore.propTypes = {
  home: PropTypes.object.isRequired,
  visitor: PropTypes.object.isRequired,
};

export default Boxscore;
