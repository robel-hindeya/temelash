'use client';
import React from 'react';

/**
 * Base class for every screen. Each screen keeps its state and handlers in
 * renderVals(), and a JSX template (attached as __template) draws them.
 */
export default class DCLogic extends React.Component {
  constructor(props) {
    super(props);
    if (!this.state) this.state = {};
  }

  render() {
    const vals = (this.renderVals && this.renderVals()) || {};
    return this.__template(vals);
  }
}
