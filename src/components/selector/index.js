import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import shortid from 'shortid';

import './index.css';

const Level = () => (
  <div className="level col-lg-3 col-md-4 col-xs-6">
    <a href="/learn" className="d-block mb-4 h-100">
      <img className="img-fluid img-thumbnail" src="http://placehold.it/400x300" alt="" />
    </a>
  </div>
);

class Selector extends Component {
  constructor(props) {
    super(props);

    this.data = [];

    for (let i = 0; i < 50; i++) {
      this.data.push(i);
    }
  }

  render() {
    return (
      <div className="row text-center text-lg-left">
        {this.data.map(() => <Level key={shortid.generate()} />)}
      </div>
    );
  }
}

Selector.propTypes = {

};

export default connect(
  state => ({

  }),
  {

  },
)(Selector);
