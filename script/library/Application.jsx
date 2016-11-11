import React, { Component, PropTypes } from 'react';

export default class Application extends Component {

  /**
   * Remder
   */
  render() {
    return (<section>Hello <Who name="World" /></section>);
  }

}

if (__DEV__) {
  Application.propTypes = {};
  Application.defaultProps = {};
}


const Who = ({ name }) => (
  <span>{ name }</span>
);


Who.propTypes = {
  name: PropTypes.string,
};
