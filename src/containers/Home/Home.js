import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from './actions';
import Wrapper from '../../components/Wrapper';
import DateSelector from '../../components/DateSelector';

class Home extends Component {
  render() {
    const { addDay, subDay, date } = this.props;

    return (
      <Wrapper>
        <Fragment>
          <DateSelector
            date={date}
            addDay={() => addDay(date)}
            subDay={() => subDay(date)}
          />
          <Link to="/settings" href="settings">
            Settings
          </Link>
        </Fragment>
      </Wrapper>
    );
  }
}

Home.propTypes = {
  addDay: PropTypes.func.isRequired,
  date: PropTypes.number.isRequired,
  subDay: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  date: state.home.date,
});

export default connect(mapStateToProps, actions)(Home);
