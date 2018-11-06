import React, { Component } from "react";

class SelectMaxRatio extends Component {
  render() {
    const { defaultMaxRatio = 0.001, updateMethod } = this.props;
    return (
      <div>
        <h6>Max. Ratio</h6>
        <input
          className="form-control"
          type="number"
          value={defaultMaxRatio}
          step="0.001"
          onChange={event => updateMethod(event.target.value)}
        />
      </div>
    );
  }
}
export default SelectMaxRatio;
