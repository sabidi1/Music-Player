import React, { Component } from 'react';
import './Player.css';

class Player extends Component {
    constructor() {
        super();
        this.playing = true;
        this.state = {
            file: 'http://localhost:8000/Imagine%20Dragons%20-%20Natural.mp3'
        };
    }
    play() {
        if(this.playing == true)
            this.refs.player.play();
        else
            this.refs.player.pause();
        this.playing = !this.playing;
    }
    render() {
        return (
            <div className="player">
                <div className="controls">
                    <a>
                        <i className="fas fa-fast-backward"></i>
                    </a>
                    <a onClick={this.play.bind(this)}>
                        <i className="fas fa-play"></i>
                    </a>

                    <a>
                        <i className="fas fa-fast-forward"></i>
                    </a>
                </div>
                <div className="progress">
                    <div className="bar">
                        <div></div>
                    </div>

                </div>
                <audio ref="player" autoPlay={false}>
                    <source src={this.state.file}>
                    </source>
                </audio>
            </div>
        );
    }
}

export default Player;
