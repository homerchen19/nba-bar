import React from 'react';
import PropTypes from 'prop-types';
import R from 'ramda';
import { Flex } from 'antd-mobile';
import styled from 'styled-components';

import { colors } from '@styles/theme';

const Wrapper = styled.div`
  display: block;
  flex: 3;
  width: 100%;
  overflow-y: scroll !important;
  border-top: 1px solid ${colors.white};
  border-bottom: 1px solid ${colors.white};
  background: #fff;
`;

const Row = styled(Flex)`
  flex: 1;
  width: 100%;
  padding: 10px 15px;
  border-top: 1px solid ${colors.white};
  border-bottom: 1px solid ${colors.white};
`;

const Column = styled(Flex.Item)`
  margin: 0 !important;
  text-align: ${props => props.align};
`;

const Table = ({ home, visitor }) => (
  <Wrapper>
    {R.map(
      key => (
        <Row key={key} justify="center">
          <Column align="left">
            <p>{home[key]}</p>
          </Column>
          <Column align="center">
            <b>
              <p>
                {key === 'plus_minus'
                  ? '+/-'
                  : key.toUpperCase().replace('_PCT', '%')}
              </p>
            </b>
          </Column>
          <Column align="right">
            <p>{visitor[key]}</p>
          </Column>
        </Row>
      ),
      R.keys(home)
    )}
  </Wrapper>
);

Table.propTypes = {
  home: PropTypes.object.isRequired,
  visitor: PropTypes.object.isRequired,
};

export default Table;
