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
    left: 50%;
    width: 0;
    z-index:100;
  }
  50% {
    left: 0;
    width: 100%;
    z-index: 10;
  }
  to {
    left: 0;
    width: 100%;
  }
`;

const Bar = styled.div`
  content: '';
  display: inline;
  position: absolute;
  width: 0;
  height: 100%;
  left: 50%;
  text-align: center;
`;

const FirstBar = Bar.extend`
  background-color: ${colors.red};
  animation: ${loading} 2s ease-in-out infinite;
`;

const SecondBar = Bar.extend`
  background-color: ${colors.blue};
  animation: ${loading} 2s ease-in-out 1s infinite;
`;

const BarLoader = () => (
  <Wrapper>
    <FirstBar />
    <SecondBar />
  </Wrapper>
);

export default BarLoader;
