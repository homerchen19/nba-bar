import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from './actions';
import Wrapper from '../../components/Wrapper';
import DateSelector from '../../components/DateSelector';
import Spinner from '../../components/Spinner';
import MatchCard from '../../components/MatchCard';

class Home extends Component {
  componentDidMount() {
    this.props.fetchData(this.props.date, 'today');
  }

  render() {
    const { fetchData, date, loading, scheduleData } = this.props;

    return (
      <Wrapper>
        <Fragment>
          <DateSelector
            date={date}
            addDay={() => fetchData(date, 'add')}
            subDay={() => fetchData(date, 'sub')}
          />
          {loading && <Spinner />}
          {!loading &&
            scheduleData.map(matchData => (
              <MatchCard key={matchData.id} data={matchData} />
            ))}
          <Link to="/settings" href="settings">
            Settings
          </Link>
        </Fragment>
      </Wrapper>
    );
  }
}

Home.propTypes = {
  date: PropTypes.number.isRequired,
  fetchData: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  scheduleData: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = state => ({
  date: state.home.date,
  loading: state.home.loading,
  scheduleData: state.home.scheduleData,
});

export default connect(mapStateToProps, actions)(Home);
