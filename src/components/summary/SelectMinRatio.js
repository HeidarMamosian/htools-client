import React, { Component } from "react";

class SelectMinRatio extends Component {
  render() {
    const { defaultMinRatio = 0.001, updateMethod } = this.props;
    return (
      <div>
        <h6>Min. Ratio</h6>
        <input
          className="form-control"
          type="number"
          value={defaultMinRatio}
          step="0.001"
          onChange={event => updateMethod(event.target.value)}
        />
      </div>
    );
  }
}
export default SelectMinRatio;
