import React, { Component, PropTypes } from 'react';

export default class Application extends Component {

  /**
   * Remder
   */
  render() {
    return (<section>Hello</section>);
  }

}

if (__DEV__) {
  Application.propTypes = {};
  Application.defaultProps = {};
}
