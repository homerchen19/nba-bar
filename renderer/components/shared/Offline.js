import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { Flex } from 'antd-mobile';

import { colors } from '@styles/theme';
import Layout from './Layout';

const Content = styled(Flex)`
  flex: 1;
  width: 100%;
  height: 100%;
  padding: 0.5rem;
`;

const Oops = styled.h1`
  color: ${colors.red};
  font-size: 1.2rem;
  font-weight: 500;
  text-align: center;
`;

export default class Offline extends PureComponent {
  render() {
    return (
      <Layout>
        <Content direction="column" justify="center">
          <Oops>
            Oops, offline.
            <br />
            This App requires the internent to be connected 📡
          </Oops>
        </Content>
      </Layout>
    );
  }
}
