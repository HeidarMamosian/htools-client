import React, { Component } from "react";
import Sentences from "./Sentences";
import "../../App.css";

class SummaryResult extends Component {
  state = {
    selectedSentence: undefined
  };
  handelHighLightSentence = sent => {
    this.setState({ selectedSentence: sent });
  };
  render() {
    let mytext= this.props.location.state.text;
    let indexstart=0
    let indexend=mytext.length;

    if(this.state.selectedSentence){
         indexstart = mytext.indexOf(this.state.selectedSentence);
        const indexend = indexstart + this.state.selectedSentence.length;
    }
    return (
      <div>
        <h3 className="myfont text-center"> Text Summarization Result</h3>
        <div className="textclass">
          <h6 className="myfont text-center"> Original Text</h6>
    
          {mytext}
          {/* <span style={{backgroundColor:"yellow"}}> {  mytext.substring(indexstart+1,indexend )} </span> */}
        </div>

        <div className="summaryclass">
          <h6 className="myfont text-center">Text summary</h6>

          <div>
            <br />
            <Sentences
              handelHighLightSentence={this.handelHighLightSentence}
              sents={this.props.location.state.sentences}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default SummaryResult;
