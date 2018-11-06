import React, { Component } from "react";

class SelectSentenceNumber extends Component {
  render() {
    const { defaultSentenceNumber = 10, updateMethod } = this.props;
    return (
      <div>
        <h6>Max. Sentences No.</h6>
        <input
          className="form-control"
          type="number"
          value={defaultSentenceNumber}
          onChange={event => updateMethod(event.target.value)}
        />
      </div>
    );
  }
}
export default SelectSentenceNumber;
