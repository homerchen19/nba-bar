import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import { TabBar, Flex } from 'antd-mobile';
import styled from 'styled-components';

import { colors } from '../../styles/theme';
import calendarWhiteIcon from '../../../resources/calendar_white.svg';
import calendarGreyIcon from '../../../resources/calendar_grey.svg';
import trophyWhiteIcon from '../../../resources/trophy_white.svg';
import trophyBlackIcon from '../../../resources/trophy_grey.svg';
import settingsWhiteIcon from '../../../resources/settings_white.svg';
import settingsBlackIcon from '../../../resources/settings_grey.svg';

const Layout = styled.div`
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100vh;
`;

const Content = styled(Flex)`
  flex: 1;
  width: 100%;
  height: 100%;
  padding: 0;
`;

const Icon = styled.div`
  width: 22px;
  height: 22px;
  background: url(${props => props.url}) center center / 21px 21px no-repeat;
  cursor: pointer;
`;

const Title = styled.span`
  cursor: pointer;
`;

const Wrapper = ({ currentTab, children }) => (
  <Layout>
    <TabBar
      tintColor={colors.white}
      barTintColor={colors.blue}
      unselectedTintColor={colors.liteGrey}
    >
      <TabBar.Item
        key="Schedule"
        title={<Title>Schedule</Title>}
        selected={currentTab === 1}
        icon={<Icon url={calendarGreyIcon} />}
        selectedIcon={<Icon url={calendarWhiteIcon} />}
        onPress={() => {
          Router.push(`/home`);
        }}
      >
        <Content direction="column">{currentTab === 1 && children}</Content>
      </TabBar.Item>
      <TabBar.Item
        key="Standing"
        title={<Title>Standing</Title>}
        selected={currentTab === 2}
        icon={<Icon url={trophyBlackIcon} />}
        selectedIcon={<Icon url={trophyWhiteIcon} />}
        onPress={() => {
          Router.push(`/standings`);
        }}
      >
        <Content direction="column">{currentTab === 2 && children}</Content>
      </TabBar.Item>
      <TabBar.Item
        key="Settings"
        title={<Title>Settings</Title>}
        selected={currentTab === 3}
        icon={<Icon url={settingsBlackIcon} />}
        selectedIcon={<Icon url={settingsWhiteIcon} />}
        onPress={() => {
          Router.push(`/settings`);
        }}
      >
        <Content direction="column">{currentTab === 3 && children}</Content>
      </TabBar.Item>
    </TabBar>
  </Layout>
);

Wrapper.propTypes = {
  currentTab: PropTypes.number.isRequired,
  children: PropTypes.element,
};

Wrapper.defaultProps = {
  children: <Fragment />,
};

export default Wrapper;
