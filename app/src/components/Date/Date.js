import React, { Component } from 'react';
import './Date.css'

class Date extends Component {
  render() {
    return (
      <div className="date">
        <div className="date-last">Last Updated</div>
        <div className="date-time">{this.props.date}</div>
      </div>
    );
  }
}

export default Date;
