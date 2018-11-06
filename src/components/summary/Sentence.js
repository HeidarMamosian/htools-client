import React, { Component } from "react";

class Sentence extends Component {

  handelClick = e => {
    this.props.handelHighLightSentence(this.props.sentence);
  };

  render() {
    return (
      <tr onClick={this.handelClick}>
        <td style={{ width: "10%" }}>{this.props.index}</td>
        <td>{this.props.sentence}</td>
      </tr>
    );
  }
}

export default Sentence;
