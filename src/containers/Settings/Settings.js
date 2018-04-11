import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Wrapper from '../../components/Wrapper';
import { List } from '../../components/Settings';

class Settings extends Component {
  render() {
    const { history } = this.props;
    const { remote: { app }, shell } = window.require('electron');

    return (
      <Wrapper
        currentTab={3}
        history={history}
        settings={
          <List
            quit={() => {
              app.quit();
            }}
            openExternal={url => () => {
              app.hide();
              shell.openExternal(url);
            }}
          />
        }
      />
    );
  }
}

Settings.propTypes = {
  history: PropTypes.object.isRequired,
};

export default connect()(Settings);
