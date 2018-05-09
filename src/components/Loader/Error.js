import React, { PureComponent } from 'react';
import { Flex } from 'antd-mobile';
import styled from 'styled-components';

import { colors } from '../../styles/theme';

const Wrapper = styled(Flex)`
  width: 100vh;
  height: 100%;
  flex: 1;
`;

const Text = styled.p`
  margin: 5px 0;
  color: ${colors.red};
  font-size: 15px;
  font-weight: 500;
`;

const Report = styled.a`
  color: ${colors.blue};
  font-size: 15px;
  cursor: pointer;
  font-weight: 400;

  &:hover {
    margin-bottom: -1px;
    border-bottom: 1px solid ${colors.darkBlue};
    color: ${colors.darkBlue};
  }
`;

class Error extends PureComponent {
  render() {
    const {
      remote: { app },
      shell,
    } = window.require('electron');

    return (
      <Wrapper justify="center" direction="column">
        <Text>
          Oops! Something goes wrong{' '}
          <span role="img" aria-label="Sad">
            🙁
          </span>
        </Text>
        <Text>
          <Report
            onClick={() => {
              app.hide();
              shell.openExternal('https://github.com/xxhomey19/nba-bar/issues');
            }}
          >
            Report issues
          </Report>
        </Text>
      </Wrapper>
    );
  }
}

export default Error;
