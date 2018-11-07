import React, { Component } from "react";

class SelectRatio extends Component {
  render() {
    const { defaultRatio = 0.05, updateMethod } = this.props;
    return (
      <div>
        <h6>Summary Ratio</h6>
        <input
          className="form-control"
          type="number"
          value={defaultRatio}
          step="0.01"
          onChange={event => updateMethod(event.target.value)}
        />
        <small className="text-muted d-block">The Ratio of summary to original text.</small>
      </div>
    );
  }
}
export default SelectRatio;
