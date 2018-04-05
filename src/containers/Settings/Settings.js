import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Wrapper from '../../components/Wrapper';
import { List } from '../../components/Settings';

class Settings extends Component {
  render() {
    const { history } = this.props;
    const { app } = window.require('electron').remote;
    console.log(app);

    return (
      <Wrapper
        currentTab={3}
        history={history}
        settings={
          <List
            quit={() => {
              app.quit();
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
