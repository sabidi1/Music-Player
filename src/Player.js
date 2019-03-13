import React, { Component } from 'react';
import './Player.css';

class Player extends Component {
    render() {
        return (
            <div className="player">
                <div className="controls">
                    <a href="javascript:void();">
                        <i className="fas fa-fast-backward"></i>
                    </a>
                    <a href="javascript:void();">
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
            </div>
        );
    }
}

export default Player;
