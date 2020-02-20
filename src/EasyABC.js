import React, {Component} from 'react';
import alphabets from './alphabets.json'

class EasyABC extends Component {
    constructor(props) {
        super(props);
        this.state = {
            alphabets: alphabets,
            currentPosition: 0
        }
    }
    render() {
        console.log(alphabets);
        return(
            <div className = "game">
               <div className="option">
                   <div className="fields">
                       <div className="field-block">
                            {this.state.alphabets[this.state.currentPosition].letter}
                       </div>
                   </div>
                   <div className="buttons">
                       <a href="#" class="button prev">Previous</a>
                       <a href="#" class="button sound">Play Sound Again</a>
                       <a href="#" class="button next">Next</a>
                   </div>
                   <div className="fields">
                       <div className="field-block">
                            <div className="left-field">
                                <div className="placeholder-span">
                                    <img className="letter-image" src={this.state.alphabets[this.state.currentPosition].image} />
                                </div>
                            </div>
                            <div className="right-field">
                            <div className="placeholder-span">
                                    Click next to view Spelling
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