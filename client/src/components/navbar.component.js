import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">Splits</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
          <Link to="/workout" className="nav-link">View Today's Workout</Link>
          </li>
          <li className="navbar-item">
          <Link to="/splits" className="nav-link">Choose Split</Link>
          </li>
        </ul>
        </div>
      </nav>
    );
  }
}