import React from 'react';
import PropTypes from 'prop-types';
import R from 'ramda';
import { Flex } from 'antd-mobile';
import styled from 'styled-components';
import { StickyTable, Row, Cell } from 'react-sticky-table';
import { getMainColor } from 'nba-color';

import { colors } from '../../styles/theme';

const Wrapper = styled(Flex)`
  width: 100%;
  height: 340px;
  background: #fff;
`;

const StyledCell = styled(Cell)`
  padding: 8px 11px;
  border-bottom: 1px solid ${colors.white};
  text-align: ${props => props.align};
  white-space: pre;
  word-wrap: break-word;
`;

const Score = styled.span`
  color: ${props => props.color};
  font-weight: ${props => (props.color === '#000' ? '200' : '700')};
`;

const getQuaterString = period =>
  period > 5 ? `OT${period - 4}` : `Q${period}`;

const getClock = clock => (clock !== '' ? clock : '12:00');

const latestScore = {
  home: 0,
  visitor: 0,
};

const reanderPlayByPlayRow = R.compose(
  R.reverse,
  R.map(data => {
    let homeColor = '#000';
    let visitorColor = '#000';

    if (+data.home_score > latestScore.home) {
      homeColor = getMainColor(data.team_abr).hex;
    } else if (+data.visitor_score > latestScore.visitor) {
      visitorColor = getMainColor(data.team_abr).hex;
    }

    latestScore.home = +data.home_score;
    latestScore.visitor = +data.visitor_score;

    return (
      <Row key={data.event}>
        <StyledCell key="name" align="center">
          <p>{`${getQuaterString(+data.period)} ${getClock(data.clock)}`}</p>
          <p>
            <Score color={homeColor}>{data.home_score}</Score> -{' '}
            <Score color={visitorColor}>{data.visitor_score}</Score>
          </p>
        </StyledCell>
        <StyledCell key="score" align="left" style={{ padding: '8px 0' }}>
          {data.description.replace(/\[.*\]/i, '').trim()}
        </StyledCell>
      </Row>
    );
  })
);

const PlayByPlay = ({ gamePlayByPlayData }) => (
  <Wrapper justify="center">
    <StickyTable stickyHeaderCount={0}>
      {reanderPlayByPlayRow(gamePlayByPlayData)}
    </StickyTable>
  </Wrapper>
);

PlayByPlay.propTypes = {
  gamePlayByPlayData: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default PlayByPlay;
