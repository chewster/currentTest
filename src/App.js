import React, { Component } from 'react';
import './App.css';
import DistanceMatrix from './component/distance_matrix';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">How long is the drive?</h1>
        </header>
        <p className="App-intro">
        </p>
        <DistanceMatrix />

      </div>
    );
  }
}

export default App;
