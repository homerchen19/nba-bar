import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import differenceInHours from 'date-fns/difference_in_hours';

import Wrapper from '@components/Wrapper';
import { Spinner, Error } from '@components/Loader';
import { Table } from '@components/Standings';
import { DataSection } from '@components/shared';
import * as actions from './actions';

class Standings extends Component {
  componentDidMount() {
    if (differenceInHours(Date.now(), this.props.updatedAt) >= 6) {
      this.props.fetchData();
    }
  }

  render() {
    const { error, loading, standingsData } = this.props;

    return (
      <Wrapper currentTab={2}>
        <DataSection>
          {loading && <Spinner />}
          {error && <Error />}
          {!error &&
            !loading && (
              <Table east={standingsData.east} west={standingsData.west} />
            )}
        </DataSection>
      </Wrapper>
    );
  }
}

Standings.propTypes = {
  fetchData: PropTypes.func.isRequired,
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
