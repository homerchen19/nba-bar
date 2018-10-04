import React from 'react';
import PropTypes from 'prop-types';
import { Flex } from 'antd-mobile';
import { Table as VirtualizedTable } from 'react-virtualized';
import styled from 'styled-components';

import { colors } from '@styles/theme';
import nba from '@utils/nba';

const Wrapper = styled(Flex)`
  width: 100%;
  height: 100%;
  overflow-y: scroll !important;
`;

const HeaderCell = styled.div`
  width: ${props => props.width}px;
  padding: 8px 14px;
  background: ${colors.darkBlue};
  color: #fff;
  font-weight: 600;
  text-align: center;
`;

const Cell = styled.div`
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

const headerRowRenderer = ({ className, style }) => (
  <Flex className={className} style={style}>
    <HeaderCell key="Teams" width="75">
      Teams
    </HeaderCell>
    <HeaderCell key="W" width="47">
      W
    </HeaderCell>
    <HeaderCell key="L" width="47">
      L
    </HeaderCell>
    <HeaderCell key="WIN%" width="73">
      WIN%
    </HeaderCell>
    <HeaderCell key="GB" width="59">
      GB
    </HeaderCell>
  </Flex>
);

headerRowRenderer.propTypes = {
  className: PropTypes.object.isRequired,
  style: PropTypes.object.isRequired,
};

const rowRenderer = ({ rowData, style }) => (
  <Flex key={rowData.teamId} style={style}>
    <Cell
      key="name"
      align="left"
      style={{
        color: '#fff',
        background: nba.getTeamBackgroundColor(rowData.name),
        fontWeight: '500',
      }}
      width="75"
    >
      {rowData.name}
    </Cell>
    <Cell key="W" width="47">
      {rowData.win}
    </Cell>
    <Cell key="L" width="47">
      {rowData.loss}
    </Cell>
    <Cell key="WIN %" width="73">
      {rowData.winPct}
    </Cell>
    <Cell key="GB" width="59">
      {rowData.gamesBehind}
    </Cell>
  </Flex>
);

rowRenderer.propTypes = {
  rowData: PropTypes.object.isRequired,
  style: PropTypes.object.isRequired,
};

const renderConferenceTable = (teams, conference) => (
  <div key={conference} style={{ width: '100%' }}>
    <Conference>{conference}</Conference>
    <VirtualizedTable
      width={300}
      height={300}
      headerHeight={32}
      rowHeight={30}
      rowCount={teams.length}
      rowGetter={({ index }) => teams[index]}
      headerRowRenderer={headerRowRenderer}
      rowRenderer={rowRenderer}
    />
  </div>
);

const Table = ({ east, west }) => (
  <Wrapper direction="column" align="center">
    {renderConferenceTable(east, 'east')}
    {renderConferenceTable(west, 'west')}
  </Wrapper>
);

Table.propTypes = {
  east: PropTypes.arrayOf(PropTypes.object).isRequired,
  west: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Table;
