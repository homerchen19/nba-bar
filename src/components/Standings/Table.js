import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import R from 'ramda';
import { Flex } from 'antd-mobile';
import { StickyTable, Row, Cell } from 'react-sticky-table';
import styled from 'styled-components';
import { getMainColor } from 'nba-color';

import { colors } from '../../styles/theme';

const Wrapper = styled(Flex)`
  overflow-y: scroll !important;
  width: 100%;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const Item = styled(Flex.Item)`
  width: 100%;
  margin: 0 !important;
`;

const HeaderCell = styled(Cell)`
  padding: 8px 14px;
  background: ${colors.darkBlue};
  color: #fff;
  text-align: center;
  font-weight: 600;
`;

const StyledCell = styled(Cell)`
  width: ${props => props.width}px;
  padding: 6px 14px;
  border-bottom: 1px solid ${colors.white};
  background: #fff;
  text-align: ${props => props.align || 'center'};
`;

const Conference = styled.h3`
  padding: 10px 0;
  background: ${colors.blue};
  color: #fff;
  text-align: center;
  text-transform: uppercase;
`;

const renderHeaderCell = () => {
  const cells = ['Teams', 'W', 'L', 'WIN%', 'GB'];

  return cells.map(cell => <HeaderCell key={cell}>{cell}</HeaderCell>);
};

const renderConferenceTable = (team, conference) => (
  <Fragment>
    <Conference>{conference}</Conference>
    <StickyTable key={conference} stickyColumnCount={0}>
      <Row key="header">{renderHeaderCell()}</Row>
      {R.map(
        teamData => (
          <Row key={teamData.teamId}>
            <StyledCell
              key="name"
              align="left"
              style={{
                color: '#fff',
                background: getMainColor(teamData.name).hex,
                fontWeight: '500',
              }}
              width="75"
            >
              {teamData.name}
            </StyledCell>
            <StyledCell key="W" width="47">
              {teamData.win}
            </StyledCell>
            <StyledCell key="L" width="47">
              {teamData.loss}
            </StyledCell>
            <StyledCell key="WIN %" width="73">
              {teamData.winPct}
            </StyledCell>
            <StyledCell key="GB" width="59">
              {teamData.gamesBehind}
            </StyledCell>
          </Row>
        ),
        team
      )}
    </StickyTable>
  </Fragment>
);

const Table = ({ east, west }) => (
  <Wrapper direction="column" align="center">
    <Item>{renderConferenceTable(east, 'east')}</Item>
    <Item>{renderConferenceTable(west, 'west')}</Item>
  </Wrapper>
);

Table.propTypes = {
  east: PropTypes.arrayOf(PropTypes.object).isRequired,
  west: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Table;
