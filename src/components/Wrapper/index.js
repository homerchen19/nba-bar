import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
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
  width: 100%;
  height: 100%;
`;

const Content = styled(Flex)`
  width: 100%;
  height: 100%;
  padding: 0;
  flex: 1;
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

const Wrapper = ({ currentTab, history, schedule, standings, settings }) => (
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
          history.push(`/`);
        }}
      >
        <Content direction="column">{schedule}</Content>
      </TabBar.Item>
      <TabBar.Item
        key="Standing"
        title={<Title>Standing</Title>}
        selected={currentTab === 2}
        icon={<Icon url={trophyBlackIcon} />}
        selectedIcon={<Icon url={trophyWhiteIcon} />}
        onPress={() => {
          history.push(`/standings`);
        }}
      >
        <Content direction="column">{standings}</Content>
      </TabBar.Item>
      <TabBar.Item
        key="Settings"
        title={<Title>Settings</Title>}
        selected={currentTab === 3}
        icon={<Icon url={settingsBlackIcon} />}
        selectedIcon={<Icon url={settingsWhiteIcon} />}
        onPress={() => {
          history.push(`/settings`);
        }}
      >
        <Content direction="column">{settings}</Content>
      </TabBar.Item>
    </TabBar>
  </Layout>
);

Wrapper.propTypes = {
  currentTab: PropTypes.number.isRequired,
  history: PropTypes.object.isRequired,
  schedule: PropTypes.element,
  settings: PropTypes.element,
  standings: PropTypes.element,
};

Wrapper.defaultProps = {
  schedule: <Fragment />,
  settings: <Fragment />,
  standings: <Fragment />,
};

export default Wrapper;
