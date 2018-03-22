import React from 'react';
import PropTypes from 'prop-types';
import { Tabs, Flex } from 'antd-mobile';
import styled from 'styled-components';

const Layout = styled(Flex)`
  width: 100%;
  height: 100%;
`;

const Content = styled(Flex)`
  width: 100%;
  height: 100%;
  padding: 15px;
  flex: 1;
  overflow-y: scroll !important;
`;

const Title = styled.p`
  cursor: pointer;
`;

const Wrapper = ({ children }) => (
  <Layout direction="column">
    <Tabs
      tabs={[
        { title: <Title>Schedule</Title> },
        { title: <Title>Ranking</Title> },
      ]}
    >
      <Content direction="column">{children}</Content>
      <Content direction="column">
        <p>Ranking</p>
      </Content>
    </Tabs>
  </Layout>
);

Wrapper.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Wrapper;
