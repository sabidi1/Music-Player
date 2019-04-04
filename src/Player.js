import React, { Component } from 'react';
import './Player.css';

class Player extends Component {
    constructor() {
        super();
        this.state = {
            file: 'http://localhost:8000/Imagine%20Dragons%20-%20Natural.mp3'
        };
    }
    play() {
        this.refs.player.play();
    }
    render() {
        return (
            <div className="player">
                <div className="controls">
                    <a href="javascript:void();">
                        <i className="fas fa-fast-backward"></i>
                    </a>
                    <a onClick={this.play.bind(this)} href="javascript:void();">
                        <i className="fas fa-play"></i>
                    </a>

                    <a href="javascript:void();">
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
