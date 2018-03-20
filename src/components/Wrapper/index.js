import React from 'react';
import PropTypes from 'prop-types';
import { WingBlank, WhiteSpace, NavBar, Flex } from 'antd-mobile';
import styled from 'styled-components';

const Layout = styled(Flex)`
  width: 100%;
  height: 100%;
`;

const Navbar = styled(NavBar)`
  width: 100%;
`;

const Content = styled(Flex.Item)`
  width: 100%;
  margin: 0 !important;
`;

const Wrapper = ({ children }) => (
  <Layout direction="column">
    <Navbar mode="light">NBA Menubar</Navbar>
    <Content>
      <WhiteSpace />
      <WingBlank>{children}</WingBlank>
    </Content>
  </Layout>
);

Wrapper.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Wrapper;
