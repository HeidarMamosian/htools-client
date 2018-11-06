import React, { Component } from "react";

class SelectThreshold extends Component {
  render() {
    const { defaultThreshold = 0.001, updateMethod } = this.props;
    return (
      <div>
        <h6>Threshold</h6>
        <input
          className="form-control"
          type="number"
          value={defaultThreshold}
          step="0.1"
          onChange={event => updateMethod(event.target.value)}
        />
      </div>
    );
  }
}
export default SelectThreshold;
