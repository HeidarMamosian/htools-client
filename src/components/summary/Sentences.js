import React, { Component } from "react";
import Sentence from "./Sentence";
class Sentences extends Component {
  render() {
    const sentences = this.props.sents;

    return (
      <div className="row form-group">
        <table className="table table-bordered table-hover">
          <thead>
            <tr>
              <th style={{ width: "10%" }}>#</th>
              <th>Sentence</th>
            </tr>
          </thead>
          <tbody>
            {sentences.map((x, i) => {
              return <Sentence   handelHighLightSentence={this.props.handelHighLightSentence}  index={i + 1} sentence={x} key={i}/>;
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Sentences;
