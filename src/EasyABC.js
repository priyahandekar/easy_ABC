import React, {Component} from 'react';
import alphabets from './alphabets.json';
import classNames from 'classnames';

class EasyABC extends Component {
    constructor(props) {
        super(props);
        this.state = {
            alphabets: alphabets,
            currentPosition: 0,
            currentTick: 0,
            random: false,
            sound: true
        }
    }

    componentDidMount() {
        let letterSound = document.querySelector(`audio[data-key = 'letter']`);
        if(this.state.currentPosition === 0) {
            letterSound.currentTime = 0;
            letterSound.play();
        }
        
    }

    componentDidUpdate() {
        this.playSound();
    }

    playSound = () => {
        let letterSound = document.querySelector(`audio[data-key = 'letter']`);
        let wordSound = document.querySelector(`audio[data-key = 'word']`);
        if(this.state.sound) {
            if(this.state.currentTick === 0) {
                letterSound.currentTime = 0;
                letterSound.play();
            } else {
                wordSound.currentTime = 0;
                wordSound.play();
            }
        }
       
    }

    randomNumber = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    next = () => {
        if(this.state.random) {
          if(this.state.currentTick < 2) {
            this.setState({currentTick: this.state.currentTick + 1})
          } else {
              this.setState({currentPosition: this.randomNumber(0,25) , currentTick: 0})
          }
        } else {
            if(this.state.currentPosition === this.state.alphabets.length - 1){
                if(this.state.currentTick < 2) {
                    this.setState({
                        currentTick: this.state.currentTick + 1,
                    })
                    
                } else {
                    this.setState({
                        currentPosition: 0,
                        currentTick: 0
                    })
                }
            } else {
                if(this.state.currentTick < 2) {
                    this.setState({
                        currentTick: this.state.currentTick + 1
                    })
                } else {
                    this.setState({
                        currentPosition: this.state.currentPosition + 1,
                        currentTick: 0
                    })
                }
               
            }
        }
        
    }

    prev = () => {
        if(this.state.currentPosition > 0) {
            this.setState({
                currentPosition: this.state.currentPosition - 1,
                currentTick: 0
            })
        } else
        this.setState({
            currentPosition : this.state.alphabets.length - 1
        })
       
    }

    switchRandom = () => {
        this.setState({random: !this.state.random});
        this.next();
    }

    manualPlaySound = () => {
        let letterSound = document.querySelector(`audio[data-key = 'letter']`);
        let wordSound = document.querySelector(`audio[data-key = 'word']`);
       
            if(this.state.currentTick === 0) {
                letterSound.currentTime = 0;
                letterSound.play();
            } else {
                wordSound.currentTime = 0;
                wordSound.play();
            }
       
    }

    switchSound = () => {
        this.setState({sound: !this.state.sound});
    }

    render() {
        console.log(alphabets);
        let showImage = this.state.currentTick !== 0 ? true : false;
        let showWord = this.state.currentTick === 2 ? true : false
        return(
            <div className = "game">
                <span className="random-label">Random letter : </span>
                <label className="switch">
                    <input type="checkbox" defaultValue="false" checked={this.state.random} onClick={this.switchRandom} />
                    <div className = "slider round"></div>
                </label>
                <span className="random-label">Sound : </span>
                <label className="switch">
                    <input type="checkbox" defaultValue="false" checked={this.state.sound} onClick={this.switchSound} />
                    <div className = "slider round"></div>
                </label>
               <div className="option">
                   <div className="fields">
                       <div className="field-block">
                            {this.state.alphabets[this.state.currentPosition].letter}
                       </div>
                       <audio src={this.state.alphabets[this.state.currentPosition].letterSound} 
                       data-key="letter" />
                   </div>
                   <div className="buttons">
                       <a href="#" class="button prev" onClick = {this.prev}>Previous</a>
                       <a href="#" class="button sound" onClick = {this.manualPlaySound}>Play Sound Again</a>
                       <a href="#" class="button next" onClick = {this.next}>Next</a>
                   </div>
                   <div className="fields">
                       <div className="field-block">
                            <div className="left-field">
                                <div className={classNames('placeholder-span', {hide: showImage})}>
                                    Click next to view Image
                                </div>
                                <img className={classNames('letter-image', {hide: !showImage})}
                                alt = {this.state.alphabets[this.state.currentPosition].word} 
                                src={this.state.alphabets[this.state.currentPosition].image} />
                                <audio src={this.state.alphabets[this.state.currentPosition].wordSound} 
                                data-key="word" />
                            </div>
                            <div className="right-field">
                                <div className={classNames('placeholder-span', {hide: showWord})}>
                                    Click next to view Spelling
                                </div>
                                <div className={classNames('word', {hide: !showWord})}>
                                    {this.state.alphabets[this.state.currentPosition].word.toUpperCase()}
                                </div>
                            </div>
                       </div>
                   </div>
               </div>
            </div>
        )
    }
}

export default EasyABC;