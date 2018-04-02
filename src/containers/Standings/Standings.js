import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';

import * as actions from './actions';
import Wrapper from '../../components/Wrapper';
import { Spinner } from '../../components/Loader';

const DataSection = styled.section`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  overflow-y: scroll !important;

  ::-webkit-scrollbar {
    display: none;
  }
`;

class Standings extends Component {
  componentDidMount() {
    this.props.fetchData();
  }

  render() {
    const { history, loading, standingsData } = this.props;

    return (
      <Wrapper
        currentTab={2}
        history={history}
        standings={
          <DataSection>
            {loading && <Spinner />}
            {!loading && <div>{JSON.stringify(standingsData, null, 2)}</div>}
          </DataSection>
        }
      />
    );
  }
}

Standings.propTypes = {
  fetchData: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  standingsData: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  loading: state.standings.loading,
  standingsData: state.standings.standingsData,
});

export default connect(mapStateToProps, actions)(Standings);
