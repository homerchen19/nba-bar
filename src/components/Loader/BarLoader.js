import React from 'react';
import styled, { keyframes } from 'styled-components';

import { colors } from '../../styles/theme';

const Wrapper = styled.div`
  position: relative;
  width: 100vw;
  height: 6px;
  background-color: ${colors.blue};
`;

const loading = keyframes`
  from {
    z-index: 100;
    left: 50%;
    width: 0;
  }

  50% {
    z-index: 10;
    left: 0;
    width: 100%;
  }

  to {
    left: 0;
    width: 100%;
  }
`;

const Bar = styled.div`
  position: absolute;
  left: 50%;
  display: inline;
  width: 0;
  height: 100%;
  text-align: center;
  content: '';
`;

const FirstBar = Bar.extend`
  animation: ${loading} 2s ease-in-out infinite;
  background-color: ${colors.red};
`;

const SecondBar = Bar.extend`
  animation: ${loading} 2s ease-in-out 1s infinite;
  background-color: ${colors.blue};
`;

const BarLoader = () => (
  <Wrapper>
    <FirstBar />
    <SecondBar />
  </Wrapper>
);

export default BarLoader;
