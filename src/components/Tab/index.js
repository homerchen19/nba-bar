import React from 'react';
import PropTypes from 'prop-types';
import { Tabs } from 'antd-mobile';
import styled from 'styled-components';

import { colors } from '../../styles/theme';

const TabTitle = styled.span`
  font-size: 13px;
  cursor: pointer;
  font-weight: 500;
`;

const Tab = ({ children, titles }) => (
  <Tabs
    tabs={titles.map(title => ({
      title: <TabTitle>{title}</TabTitle>,
    }))}
    initialPage={0}
    tabBarInactiveTextColor={colors.black}
    tabBarActiveTextColor={colors.blue}
    tabBarUnderlineStyle={{
      border: `1px ${colors.blue} solid`,
    }}
  >
    {children}
  </Tabs>
);

Tab.propTypes = {
  children: PropTypes.node.isRequired,
  titles: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Tab;
