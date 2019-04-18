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
      loop_bool: false
    };
    files('http://localhost:8000/', (err, files) => {
      this.setState({ files: files, });
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
    if (this.state.counter >= (this.state.files.length - 1) && this.loop_bool == true) {
      this.state.counter = 0;
      var song = this.state.files[this.state.counter];
      console.log("song: " + song);
      console.log("counter: " + this.state.counter);
      this.setState({
        song_src: song,
      })
    }
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

  onPlayerShuffle(){
    files('http://localhost:8000/', (err, files) => {
      files = this.shuffle(files)
      this.setState({ files: files,
                            counter: 0,});
      this.onPlayerStart();
    })
  }

  shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 != currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  onPlayerLoop(){
      this.loop_bool=!this.loop_bool;
      console.log(this.loop_bool)
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
                onShuffle={this.onPlayerShuffle.bind(this)}
                onLoop={this.onPlayerLoop.bind(this)}
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
