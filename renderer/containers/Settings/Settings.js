import React from 'react';
import { connect } from 'react-redux';
import { shell, remote } from 'electron';

import Wrapper from '../../components/Wrapper';
import { List } from '../../components/Settings';

const Settings = () => (
  <Wrapper currentTab={3}>
    <List
      quit={() => {
        remote.app.quit();
      }}
      openExternal={url => () => {
        remote.app.hide();
        shell.openExternal(url);
      }}
    />
  </Wrapper>
);

export default connect()(Settings);
