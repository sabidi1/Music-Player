import React, { Component } from 'react';
import './Player.css';
import classnames from 'classnames';
import { format } from 'path';

class Player extends Component {
    constructor() {
        super();
        this.state = {
            is_playing: false,
            progress: 0,
            in_set_progress_mode:false,
        };
        this.is_progress_dirty = false;
        this.interval_id = setInterval(this.onUpdate.bind(this), 250);
    }
    onUpdate(){
      var player = this.refs.player;
      if(player){
        if (!this.is_progress_dirty){
          this.setState({
            progress: player.currentTime / player.duration,
          });
        }
        if(player.ended && this.props.onDone){
          this.props.onDone();
          console.log("ended");
        }
      }
    }
    togglePlay() {
        this.setState({ is_playing: !this.state.is_playing });
    }

    startSetProgress(evt) {
        this.setState({
            in_set_progress_mode: true
        });
        this.setProgress(evt);
    }
    stopSetProgress(evt) {
        this.setState({
            in_set_progress_mode: false
        })
        this.setProgress(evt);
    }
    setProgress(evt) {
        if (this.state.in_set_progress_mode) {
            var progress = (evt.clientX - offsetLeft(this.refs.progress_bar)) / this.refs.progress_bar.clientWidth;
            this.setState({
                progress: progress,
            });
            this.is_progress_dirty=true;
        }
    }

    render() {
        var currentTime = 0;
        var totalTime = 0;

        if (this.refs.player) {
            var player = this.refs.player;
            if (player.currentSrc !== this.props.src) {
                player.src = this.props.src;
            }
            player.loop = this.state.loop;
            if (player.paused && !player.ended) {
                if (this.state.is_playing) {
                    player.play();
                }
            }
            else if (!this.state.is_playing) {
                player.pause();
            }

            if (this.is_progress_dirty){
            this.is_progress_dirty=false;
            player.currentTime = (player.duration * this.state.progress);
            }

            if(this.registered_events!== player){
                this.registered_events = player;

                player.addEventListener('progress',(evt)=>{
                    if(!this.is_progress_dirty){
                    this.setState({
                        progress: player.currentTime / player.duration,
                    });
                    console.log("changing");
                }
                });

            }
            currentTime = player.currentTime;
            totalTime = player.duration;
        }
        var playerClsName = {
            "fas    ": true,
            "fa-play": !this.state.is_playing,
            "fa-pause": this.state.is_playing
        }
        return (
            <div className="player">
                <div className="controls">
                    <a onClick={this.props.onPrev}>
                        <i className="fas fa-fast-backward"></i>
                    </a>
                    <a onClick={this.togglePlay.bind(this)}>
                        <i className={classnames(playerClsName)} aria-hidden="true"></i>
                    </a>

                    <a onClick={this.props.onNext}>
                        <i className="fas fa-fast-forward"></i>
                    </a>
                </div>
                <div
                    //onClick={this.setProgress.bind(this)}
                    onMouseMove={this.setProgress.bind(this)}
                    onMouseDown={this.startSetProgress.bind(this)}
                    onMouseLeave={this.stopSetProgress.bind(this)}
                    onMouseUp={this.stopSetProgress.bind(this)}
                    className="progress">
                    <div ref="progress_bar" className="bar">
                        <div style={{ width: (this.state.progress * 100) + '%' }}></div>
                    </div>

                </div>
                <div className="time">
                {formatTime(currentTime)} / {formatTime(totalTime)}
                </div>
                <audio ref="player" autoPlay={this.state.is_playing} loop={this.loop}>
                    <source src={this.props.src}>
                    </source>
                </audio>
                {/* <ul className="list">Song List
                    <li>h1</li>
                    <li>h2</li>
                </ul> */}
            </div>
        );
    }
}
function formatNumber(num){
    var str = num + '';
    if(str.length == 1){
        return '0' + str;
    }
    else if(str.length == 0){
        return '00';
    }
    return str;
}
function formatTime(s){
    var total_seconds = Math.floor(s);
    var hours = Math.floor(total_seconds / 3600);
    var minutes = Math.floor(total_seconds / 60) - hours * 60;
    var seconds = total_seconds - minutes * 60 - hours * 3600;
    if (hours){
        return formatNumber(hours) +':' + formatNumber(minutes) +':'+formatNumber(seconds);
    }
    return formatNumber(minutes) + ':' + formatNumber(seconds);
}

function offsetLeft(element) {
    var left = 0;
    while (element && element !== document) {
        left += element.offsetLeft;
        element = element.offsetParent;
    }
    return left;
}
export default Player;
