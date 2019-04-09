import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Player from './Player'
import files from './files';

class App extends Component {
  constructor(){
    super();
    this.state ={
      counter: 0,
      files: [],
      song_src: null,
    };
    files('http://localhost:8000/',(err,files)=>{

      this.setState({files:files,});
      console.log(files);
      this.onPlayerNext();
    })
  }
  onSongDone(){
    this.setState({
      song_src: 'http://localhost:8000/Oasis%20-%20Wonderwall.mp3'
    })
    console.log("Song is done");
  }
  onPlayerNext(){
    var song = this.state.files[this.state.counter];
    console.log('len ' + this.state.files.length);
    if(this.state.counter < (this.state.files.length-1)){
      console.log("song: " + song);
      console.log("counter: " + this.state.counter);
      this.state.counter++;
      this.setState({
        song_src: song,
      })
  }
  }
  onPlayerPrev(){
    var song = this.state.files[this.state.counter];
    if(this.state.counter > 0){
      console.log("song: " + song);
      console.log("counter: " + this.state.counter);
      this.state.counter--;
      this.setState({
        song_src: song,
      })
  }
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
