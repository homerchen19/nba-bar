import React from 'react';
import PropTypes from 'prop-types';
import { Flex } from 'antd-mobile';
import styled from 'styled-components';
import { List } from 'react-virtualized';

import { colors } from '@styles/theme';

const Wrapper = styled(Flex)`
  width: 100%;
  padding: 5px 0;
  background: #fff;
`;

const StyledCell = styled(Flex.Item)`
  padding: 8px 26px;
  border-bottom: 1px solid ${colors.white};
  text-align: center;
`;

const teamStatsKeys = [
  { abbr: 'FG%', key: 'field_goals_percentage' },
  { abbr: '3P%', key: 'three_pointers_percentage' },
  { abbr: 'FT%', key: 'free_throws_percentage' },
  { abbr: 'AST', key: 'assists' },
  { abbr: 'REB', key: '' },
  { abbr: 'STL', key: 'steals' },
  { abbr: 'BLK', key: 'blocks' },
  { abbr: 'TOV', key: 'turnovers' },
  { abbr: 'FOUL', key: 'fouls' },
];

const Stats = ({ home, visitor }) => (
  <Wrapper justify="center">
    <List
      width={300}
      height={340}
      rowCount={teamStatsKeys.length}
      rowHeight={340 / teamStatsKeys.length}
      rowRenderer={({ key, index, style }) => {
        const { abbr, key: statsKey } = teamStatsKeys[index];

        return (
          <Flex key={key} style={style} justify="center">
            <StyledCell key="home">
              {abbr === 'REB'
                ? +home.stats.rebounds_offensive +
                  +home.stats.rebounds_defensive
                : home.stats[statsKey]}
            </StyledCell>
            <StyledCell key="item">
              <b>{abbr}</b>
            </StyledCell>
            <StyledCell key="visitor">
              {abbr === 'REB'
                ? +visitor.stats.rebounds_offensive +
                  +visitor.stats.rebounds_defensive
                : visitor.stats[statsKey]}
            </StyledCell>
          </Flex>
        );
      }}
    />
  </Wrapper>
);

Stats.propTypes = {
  home: PropTypes.object.isRequired,
  visitor: PropTypes.object.isRequired,
};

export default Stats;
