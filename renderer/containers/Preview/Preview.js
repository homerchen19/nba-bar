import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import R from 'ramda';

import * as actions from './actions';
import Wrapper from '../../components/Wrapper';
import NavBar from '../../components/NavBar';
import { Spinner, Error } from '../../components/Loader';
import { TeamScore, Table } from '../../components/Preview';
import { DataSection } from '../../components/shared';

class Preview extends Component {
  componentDidMount() {
    this.props.fetchData(this.props.gameData);
  }

  render() {
    const {
      error,
      loading,
      gameData,
      homeTeamDashboardData,
      visitorTeamDashboardData,
    } = this.props;

    return (
      <Wrapper currentTab={1}>
        <Fragment>
          <NavBar page="PREVIEW" />
          <DataSection>
            {loading && <Spinner />}
            {error && <Error />}
            {!error &&
              !loading && (
                <Fragment>
                  <TeamScore
                    time={gameData.periodTime.periodStatus.replace(' ET', '')}
                    arena={gameData.arena}
                    city={gameData.city}
                    home={{
                      name: gameData.home.abbreviation,
                      w: homeTeamDashboardData.w,
                      l: homeTeamDashboardData.l,
                    }}
                    visitor={{
                      name: gameData.visitor.abbreviation,
                      w: visitorTeamDashboardData.w,
                      l: visitorTeamDashboardData.l,
                    }}
                  />
                  <Table
                    home={homeTeamDashboardData}
                    visitor={visitorTeamDashboardData}
                  />
                </Fragment>
              )}
          </DataSection>
        </Fragment>
      </Wrapper>
    );
  }
}

Preview.propTypes = {
  fetchData: PropTypes.func.isRequired,

  error: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  gameData: PropTypes.object.isRequired,
  homeTeamDashboardData: PropTypes.object.isRequired,
  visitorTeamDashboardData: PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  error: state.preview.error,
  loading: state.preview.loading,
  gameData: R.find(R.propEq('id', ownProps.router.query.gameId))(
    state.home.scheduleData
  ),
  homeTeamDashboardData: state.preview.homeTeamDashboardData,
  visitorTeamDashboardData: state.preview.visitorTeamDashboardData,
});

export default connect(
  mapStateToProps,
  actions
)(Preview);
