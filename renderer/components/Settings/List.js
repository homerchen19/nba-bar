import React from 'react';
import PropTypes from 'prop-types';
import { Flex, List as AntdList } from 'antd-mobile';
import styled from 'styled-components';

const Wrapper = styled(Flex)`
  width: 100vw;
  overflow-y: scroll !important;
`;

const StyledList = styled(AntdList)`
  width: 100%;
`;

const StyledItem = styled(AntdList.Item)`
  cursor: pointer;
`;

const List = ({ openExternal, quit }) => (
  <Wrapper direction="column" justify="start" align="center">
    <StyledList>
      <StyledItem
        onClick={openExternal('https://github.com/xxhomey19/nba-bar')}
      >
        About NBA Bar
      </StyledItem>
      <StyledItem
        onClick={openExternal('https://github.com/xxhomey19/nba-bar/issues')}
      >
        Report issues
      </StyledItem>
      <StyledItem extra="⌘Q" onClick={quit}>
        Quit NBA Bar
      </StyledItem>
    </StyledList>
  </Wrapper>
);

List.propTypes = {
  openExternal: PropTypes.func.isRequired,
  quit: PropTypes.func.isRequired,
};

export default List;
