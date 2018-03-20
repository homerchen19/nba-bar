import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from './actions';
import Wrapper from '../../components/Wrapper';

class Home extends Component {
  render() {
    const { date } = this.props;

    return (
      <Wrapper>
        <Fragment>
          <h1>Home Page</h1>
          <p>{date}</p>
          <Link to="/settings">Settings</Link>
        </Fragment>
      </Wrapper>
    );
  }
}

Home.propTypes = {
  date: PropTypes.number.isRequired,
};

const mapStateToProps = state => ({
  date: state.home.date,
});

export default connect(mapStateToProps, actions)(Home);
