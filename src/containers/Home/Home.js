import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';

import * as actions from './actions';
import Wrapper from '../../components/Wrapper';
import DateSelector from '../../components/DateSelector';
import Spinner from '../../components/Spinner';
import MatchCard from '../../components/MatchCard';

const DataSection = styled.section`
  display: flex;
  width: 100%;
  height: 100%;
  margin-top: 40px;
  flex-direction: column;
  overflow-y: scroll !important;

  ::-webkit-scrollbar {
    display: none;
  }
`;

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
          <DataSection>
            {loading && <Spinner />}
            {!loading &&
              scheduleData.map(matchData => (
                <MatchCard key={matchData.id} data={matchData} />
              ))}
            <Link to="/settings" href="settings">
              Settings
            </Link>
          </DataSection>
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
