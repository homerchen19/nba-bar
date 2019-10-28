import React, { useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import R from 'ramda';

import Wrapper from '@components/Wrapper';
import NavBar from '@components/NavBar';
import { Spinner, Error } from '@components/Loader';
import { TeamScore, Table } from '@components/Preview';
import { DataSection } from '@components/shared';
import * as actions from './actions';

const Preview = ({
  fetchData,
  error,
  loading,
  gameData,
  homeTeamDashboardData,
  visitorTeamDashboardData,
}) => {
  useLayoutEffect(() => {
    fetchData(gameData);
  }, []); // eslint-disable-line

  return (
    <Wrapper currentTab={1}>
      <>
        <NavBar page="PREVIEW" />
        <DataSection>
          {loading && <Spinner />}
          {error && <Error />}
          {!error && !loading && (
            <>
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
            </>
          )}
        </DataSection>
      </>
    </Wrapper>
  );
};

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
