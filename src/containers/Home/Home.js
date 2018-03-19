import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Wrapper from '../../components/Wrapper';

class Home extends Component {
  static defaultProps = {};

  render() {
    return (
      <Wrapper>
        <h1>Home Page</h1>
        <Link to="/settings">Settings</Link>
      </Wrapper>
    );
  }
}

export default Home;
