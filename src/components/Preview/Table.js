import React from 'react';
import PropTypes from 'prop-types';
import R from 'ramda';
import { Flex } from 'antd-mobile';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: block;
  width: 100%;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  flex: 2;
  overflow-y: scroll !important;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const Row = styled(Flex)`
  width: 100%;
  padding: 10px 0;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  flex: 1;
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
                  : key.toUpperCase().replace('_PCT', ' %')}
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
