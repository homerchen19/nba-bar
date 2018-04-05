import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import R from 'ramda';
import { Flex } from 'antd-mobile';
import { StickyTable, Row, Cell } from 'react-sticky-table';
import styled from 'styled-components';

const Wrapper = styled(Flex)`
  width: 100%;
  overflow-y: scroll !important;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const Item = styled(Flex.Item)`
  width: 100%;
  margin: 15px 0 !important;
`;

const StyledCell = styled(Cell)`
  padding: 6px 10.5px;
  border: 1px solid #000;
  background: #fff;
  text-align: ${props => props.align || 'center'};
`;

const Conference = styled.h3`
  margin-bottom: 10px;
  text-align: center;
  text-transform: uppercase;
`;

const renderHeaderCell = () => {
  const cells = ['Teams', 'W', 'L', 'WIN%', 'GB'];

  return cells.map(cell => (
    <StyledCell key={cell}>
      <b>{cell}</b>
    </StyledCell>
  ));
};

const renderConferenceTable = (team, conference) => (
  <Fragment>
    <Conference>{conference}</Conference>
    <StickyTable key={conference} stickyColumnCount={0}>
      <Row key="header">{renderHeaderCell()}</Row>
      {R.map(
        teamData => (
          <Row key={teamData.teamId}>
            <StyledCell key="name" align="left">
              {teamData.name}
            </StyledCell>
            <StyledCell key="W">{teamData.win}</StyledCell>
            <StyledCell key="L">{teamData.loss}</StyledCell>
            <StyledCell key="WIN %">{teamData.winPct}</StyledCell>
            <StyledCell key="GB">{teamData.gamesBehind}</StyledCell>
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
