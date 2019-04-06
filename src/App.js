import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Player from './Player'
import files from './files';

class App extends Component {
  constructor(){
    super();
    this.state ={
      song_src: 'http://localhost:8000/Imagine%20Dragons%20-%20Natural.mp3',
    };
  }
  onSongDone(){
    this.setState({
      song_src: 'http://localhost:8000/Oasis%20-%20Wonderwall.mp3'
    })
    console.log("Song is done");
  }
  onPlayerNext(){
    this.setState({
      song_src: 'http://localhost:8000/Oasis%20-%20Wonderwall.mp3'
    })
  }
  onPlayerPrev(){
    this.setState({
      song_src: 'http://localhost:8000/Imagine%20Dragons%20-%20Natural.mp3'
    })
  }

  render() {
    return (
      <div className="App">
        <div className="title">Music Player</div>
        <Player src = {this.state.song_src}
                onDone = {this.onSongDone.bind(this)}
                onNext = {this.onPlayerNext.bind(this)}
                onPrev = {this.onPlayerPrev.bind(this)}
        />
      </div>
    );
  }
}

export default App;
