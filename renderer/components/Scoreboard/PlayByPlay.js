import React from 'react';
import PropTypes from 'prop-types';
import { Flex } from 'antd-mobile';
import styled from 'styled-components';
import { AutoSizer, MultiGrid } from 'react-virtualized';

import { colors } from '../../styles/theme';
import nba from '../../utils/nba';

const Wrapper = styled(Flex)`
  width: 100%;
  height: 340px;
  background: #fff;
`;

const StyledCell = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0;
  padding: 0;
  overflow: auto;
  border-bottom: 1px solid ${colors.white};
  text-align: ${props => props.align};
  word-wrap: break-word;
  white-space: pre;
`;

const Score = styled.span`
  color: ${props => props.color};
  font-weight: ${props => (props.color === '#000' ? 200 : 700)};
`;

const getQuaterString = period =>
  period > 5 ? `OT${period - 4}` : `Q${period}`;

const getClock = clock => (clock !== '' ? clock : '12:00');

const PlayByPlay = ({ gamePlayByPlayData }) => (
  <Wrapper justify="center">
    <Flex.Item style={{ height: '100%' }}>
      <AutoSizer>
        {({ height }) => (
          <MultiGrid
            fixedColumnCount={1}
            estimatedColumnSize={300}
            columnWidth={({ index }) => (index === 0 ? 100 : 200)}
            columnCount={2}
            cellRenderer={({ columnIndex, key, rowIndex, style }) => {
              const data = gamePlayByPlayData[rowIndex];

              let homeColor = '#000';
              let visitorColor = '#000';

              if (rowIndex !== gamePlayByPlayData.length) {
                const previousData = gamePlayByPlayData[rowIndex + 1];
                if (data.home_score > previousData.home_score) {
                  homeColor = nba.getTeamBackgroundColor(data.team_abr);
                } else if (data.visitor_score > previousData.visitor_score) {
                  visitorColor = nba.getTeamBackgroundColor(data.team_abr);
                }
              }

              if (columnIndex === 0) {
                return (
                  <StyledCell key={key} align="center" style={style}>
                    <p>
                      {`${getQuaterString(+data.period)} ${getClock(
                        data.clock
                      )}`}
                    </p>
                    <p>
                      <Score key="homeScore" color={homeColor}>
                        {data.home_score}
                      </Score>{' '}
                      -{' '}
                      <Score key="visistorScore" color={visitorColor}>
                        {data.visitor_score}
                      </Score>
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
            height={height}
            hideTopRightGridScrollbar
            hideBottomLeftGridScrollbar
          />
        )}
      </AutoSizer>
    </Flex.Item>
  </Wrapper>
);

PlayByPlay.propTypes = {
  gamePlayByPlayData: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default PlayByPlay;
