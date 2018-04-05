import React from 'react';
import PropTypes from 'prop-types';
import { Flex, List as AntdList } from 'antd-mobile';
import styled from 'styled-components';

const Wrapper = styled(Flex)`
  width: 100vw;
  overflow-y: scroll !important;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const StyledList = styled(AntdList)`
  width: 100%;
`;

const StyledItem = styled(AntdList.Item)`
  cursor: pointer;
`;

const List = ({ quit }) => (
  <Wrapper direction="column" justify="start" align="center">
    <StyledList>
      <StyledItem>About NBA Bar</StyledItem>
      <StyledItem extra="⌘Q" onClick={quit}>
        Quit NBA Bar
      </StyledItem>
    </StyledList>
  </Wrapper>
);

List.propTypes = {
  quit: PropTypes.func.isRequired,
};

export default List;
