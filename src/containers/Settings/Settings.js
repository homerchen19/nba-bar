import { remote } from 'electron';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './actions';
import Button from '../../components/Button';
import Wrapper from '../../components/Wrapper';

class Settings extends Component {
  constructor(props) {
    super(props);
    this.setPath = this.setPath.bind(this);
  }

  setPath() {
    const { dialog } = remote;
    const dir = dialog.showOpenDialog({ properties: ['openDirectory'] });

    if (dir) {
      const [path] = dir;
      this.props.setPath(path);
    }
  }

  render() {
    const { path } = this.props;

    return (
      <Wrapper>
        <h1>Settings Page</h1>
        <Button onClick={this.setPath}>{path || 'Set Path'}</Button>
        <Link to="/">Back</Link>
      </Wrapper>
    );
  }
}

function mapStateToProps(state) {
  return {
    path: state.settings.path,
  };
}

export default connect(mapStateToProps, actions)(Settings);
