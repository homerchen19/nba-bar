import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TabBar, Flex } from 'antd-mobile';
import styled from 'styled-components';

import { colors } from '../../styles/theme';
import calendarWhiteIcon from '../../../resources/calendar_white.svg';
import calendarBlackIcon from '../../../resources/calendar_black.svg';
import trophyWhiteIcon from '../../../resources/trophy_white.svg';
import trophyBlackIcon from '../../../resources/trophy_black.svg';
import settingsWhiteIcon from '../../../resources/settings_white.svg';
import settingsBlackIcon from '../../../resources/settings_black.svg';

const Layout = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
`;

const Content = styled(Flex)`
  width: 100%;
  height: 100%;
  padding: 0 15px 0;
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

class Wrapper extends Component {
  state = {
    selectedTab: 1,
  };

  render() {
    const { selectedTab } = this.state;
    const { children } = this.props;

    return (
      <Layout>
        <TabBar
          tintColor={colors.white}
          barTintColor={colors.blue}
          unselectedTintColor={colors.black}
        >
          <TabBar.Item
            key="Schedule"
            title={<Title>Schedule</Title>}
            selected={selectedTab === 1}
            icon={<Icon url={calendarBlackIcon} />}
            selectedIcon={<Icon url={calendarWhiteIcon} />}
            onPress={() => {
              this.setState({ selectedTab: 1 });
            }}
          >
            <Content direction="column">{children}</Content>
          </TabBar.Item>
          <TabBar.Item
            key="Standing"
            title={<Title>Standing</Title>}
            selected={selectedTab === 2}
            icon={<Icon url={trophyBlackIcon} />}
            selectedIcon={<Icon url={trophyWhiteIcon} />}
            onPress={() => {
              this.setState({ selectedTab: 2 });
            }}
          >
            <Content direction="column">
              <p>Standing</p>
            </Content>
          </TabBar.Item>
          <TabBar.Item
            key="Settings"
            title={<Title>Settings</Title>}
            selected={selectedTab === 3}
            icon={<Icon url={settingsBlackIcon} />}
            selectedIcon={<Icon url={settingsWhiteIcon} />}
            onPress={() => {
              this.setState({ selectedTab: 3 });
            }}
          >
            <Content direction="column">
              <p>Settings</p>
            </Content>
          </TabBar.Item>
        </TabBar>
      </Layout>
    );
  }
}

Wrapper.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Wrapper;
