import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import R from 'ramda';

import * as actions from './actions';
import Spinner from '../../components/Spinner';

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

class Preview extends Component {
  componentDidMount() {
    this.props.fetchData(this.props.gameData);
  }

  render() {
    const {
      loading,
      homeTeamDashboardData,
      visitorTeamDashboardData,
    } = this.props;

    return (
      <Fragment>
        <DataSection>
          {loading && <Spinner />}
          {!loading && (
            <div>
              {JSON.stringify(homeTeamDashboardData, null, 2)}
              {JSON.stringify(visitorTeamDashboardData, null, 2)}
            </div>
          )}
          <Link to="/">Back</Link>
        </DataSection>
      </Fragment>
    );
  }
}

Preview.propTypes = {
  fetchData: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  gameData: PropTypes.object.isRequired,
  homeTeamDashboardData: PropTypes.object.isRequired,
  visitorTeamDashboardData: PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  gameData: R.find(R.propEq('id', ownProps.match.params.gameId))(
    state.home.scheduleData
  ),
  loading: state.preview.loading,
  homeTeamDashboardData: state.preview.homeTeamDashboardData,
  visitorTeamDashboardData: state.preview.visitorTeamDashboardData,
});

export default connect(mapStateToProps, actions)(Preview);
