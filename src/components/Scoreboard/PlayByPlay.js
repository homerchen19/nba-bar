import React from 'react';
import PropTypes from 'prop-types';
import { Flex } from 'antd-mobile';
import styled from 'styled-components';
import { MultiGrid } from 'react-virtualized';

import { colors } from '../../styles/theme';

const Wrapper = styled(Flex)`
  width: 100%;
  height: 340px;
  background: #fff;
`;

const StyledCell = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 8px;
  overflow: auto;
  border-bottom: 1px solid ${colors.white};
  text-align: ${props => props.align};
  word-wrap: break-word;
  white-space: pre;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const Score = styled.span`
  color: #000;
  font-weight: 200;
`;

const getQuaterString = period =>
  period > 5 ? `OT${period - 4}` : `Q${period}`;

const getClock = clock => (clock !== '' ? clock : '12:00');

const PlayByPlay = ({ gamePlayByPlayData }) => (
  <Wrapper justify="center">
    <MultiGrid
      fixedColumnCount={1}
      estimatedColumnSize={300}
      columnWidth={({ index }) => (index === 0 ? 100 : 200)}
      columnCount={2}
      cellRenderer={({ columnIndex, key, rowIndex, style }) => {
        const data = gamePlayByPlayData[rowIndex];

        if (columnIndex === 0) {
          return (
            <StyledCell key={key} align="center" style={style}>
              <p>
                {`${getQuaterString(+data.period)} ${getClock(data.clock)}`}
              </p>
              <p>
                <Score key="homeScore">{data.home_score}</Score> -{' '}
                <Score key="visistorScore">{data.visitor_score}</Score>
              </p>
            </StyledCell>
          );
        }

        return (
          <StyledCell key={key} align="left" style={style}>
            {data.description.replace(/\[.*\]/i, '').trim()}
          </StyledCell>
        );
      }}
      rowCount={gamePlayByPlayData.length}
      rowHeight={50}
      width={300}
      height={340}
      enableFixedColumnScroll
    />
  </Wrapper>
);

PlayByPlay.propTypes = {
  gamePlayByPlayData: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default PlayByPlay;
