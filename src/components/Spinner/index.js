import React from 'react';
import { Flex } from 'antd-mobile';
import MDSpinner from 'react-md-spinner';

import { colors } from '../../styles/theme';

const Spinner = () => (
  <Flex justify="center" style={{ height: '100%', width: '100%', flex: 1 }}>
    <MDSpinner
      color1={colors.blue}
      color2={colors.red}
      color3={colors.blue}
      color4={colors.red}
      size={32}
    />
  </Flex>
);

export default Spinner;
