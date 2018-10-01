import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import differenceInHours from 'date-fns/difference_in_hours';

import * as actions from './actions';
import Wrapper from '../../components/Wrapper';
import { Spinner, Error } from '../../components/Loader';
import { Table } from '../../components/Standings';

const DataSection = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow-y: scroll !important;

  ::-webkit-scrollbar {
    display: none;
  }
`;

class Standings extends Component {
  componentDidMount() {
    if (differenceInHours(Date.now(), this.props.updatedAt) >= 6) {
      this.props.fetchData();
    }
  }

  render() {
    const { error, history, loading, standingsData } = this.props;

    return (
      <Wrapper
        currentTab={2}
        history={history}
        standings={
          <DataSection>
            {loading && <Spinner />}
            {error && <Error />}
            {!error &&
              !loading && (
                <Table east={standingsData.east} west={standingsData.west} />
              )}
          </DataSection>
        }
      />
    );
  }
}

Standings.propTypes = {
  fetchData: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  error: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  standingsData: PropTypes.object.isRequired,
  updatedAt: PropTypes.number.isRequired,
};

const mapStateToProps = state => ({
  error: state.standings.error,
  loading: state.standings.loading,
  standingsData: state.standings.standingsData,
  updatedAt: state.standings.updatedAt,
});

export default connect(
  mapStateToProps,
  actions
)(Standings);
