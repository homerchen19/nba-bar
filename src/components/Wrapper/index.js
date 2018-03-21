import React from 'react';
import PropTypes from 'prop-types';
import { NavBar, Flex } from 'antd-mobile';
import styled from 'styled-components';

const Layout = styled(Flex)`
  width: 100%;
  height: 100%;
`;

const Navbar = styled(NavBar)`
  width: 100%;
`;

const Content = styled(Flex)`
  width: 100%;
  padding: 15px;
  flex: 1;
`;

const Wrapper = ({ children }) => (
  <Layout direction="column">
    <Navbar mode="light">NBA Menubar</Navbar>
    <Content direction="column">{children}</Content>
  </Layout>
);

Wrapper.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Wrapper;
