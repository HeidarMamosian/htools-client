import React, { Component } from "react";

class SelectStopwords extends Component {
  render() {
    const { defaultStopwords = 0.001, updateMethod } = this.props;
    return (
      <div>
        <h6>Stopwords</h6>
        <input
          className="form-control"
          value={defaultStopwords}
          onChange={event => updateMethod(event.target.value)}
        />
      </div>
    );
  }
}
export default SelectStopwords;
