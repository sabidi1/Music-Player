import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Player from './Player'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="title">Music Player</div>
        <Player></Player>
      </div>
    );
  }
}

export default App;
