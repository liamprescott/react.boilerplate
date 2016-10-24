import 'babel-polyfill';

import React from 'react';
import ReactDom from 'react-dom';

import Application from './Application';

// Get the route application DOMNode
const mountNode = document.getElementById('main');

// Render application
ReactDom.render(
  <Application />,
  mountNode
);
