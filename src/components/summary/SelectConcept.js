import React, { Component } from "react";

class SelectConcept extends Component {
  render() {
    const { defaultConcept = "", updateMethod } = this.props;
    return (
      <div>
        <h6>Concept</h6>
        <input
          className="form-control"
          value={defaultConcept}
          onChange={event => updateMethod(event.target.value)}
        />
      </div>
    );
  }
}
export default SelectConcept;
