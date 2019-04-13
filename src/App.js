import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Player from './Player'
import files from './files';

var url = require('url')

class App extends Component {
  constructor() {
    super();
    this.state = {
      counter: 0,
      files: [],
      song_src: null,
    };
    files('http://localhost:8000/', (err, files) => {

      this.setState({ files: files, });
      console.log(files);
      this.onPlayerStart();
    })
  }
  onSongDone() {
    this.onPlayerNext();
  }

  onPlayerStart() {
    var song = this.state.files[this.state.counter];
    console.log("song: " + song);
    console.log("counter: " + this.state.counter);
    this.setState({
      song_src: song,
    })
  }

  onPlayerNext() {
    
    if (this.state.counter >= (this.state.files.length - 1)) {
      console.log("Dont skip forward");
    }
    else{
      this.state.counter++;
      var song = this.state.files[this.state.counter];
      console.log("song: " + song);
      console.log("counter: " + this.state.counter);
      this.setState({
        song_src: song,
      })
    }
  }

  onPlayerPrev() {

    if (this.state.counter <= 0) {
      console.log("Dont skip backward");
    }
    else{
      this.state.counter--;
      var song = this.state.files[this.state.counter];
      console.log("song: " + song);
      console.log("counter: " + this.state.counter);
      this.setState({
        song_src: song,
      })
    }
  }


  render() {
    var current_song;
    if(this.state.song_src) {
      var path_parts = url.parse(this.state.song_src).path.split('/');
      current_song = decodeURIComponent(path_parts[path_parts.length - 1]);
      console.log(current_song);
    }
    return (
      <div className="App">
        <div className="title">Music Player</div>
        <Player src={this.state.song_src}
          onDone={this.onSongDone.bind(this)}
          onNext={this.onPlayerNext.bind(this)}
          onPrev={this.onPlayerPrev.bind(this)}
        />
        <br></br>
        <div className="current-song">{current_song}</div>
      </div>
    );
  }
}

export default App;
