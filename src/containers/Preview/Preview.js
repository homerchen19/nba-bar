import React, { Component } from 'react';
import { connect } from 'react-redux';

class Preview extends Component {
  render() {
    return <p>Preview</p>;
  }
}

export default connect()(Preview);
