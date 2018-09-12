import React, { Component } from 'react';

class SelectDigLevel extends Component {

    render() {
        const {DigLevel,UpdateDigLevel}=this.props;
        return (
            <div >
                <h6>Depth</h6>
                <select className="form-control"
                    value={DigLevel}
                    id="dataSourceSelect"
                    onChange={event => UpdateDigLevel(event.target.value)}
                >
                    <option value="0">
                        0
                    </option>
                    <option value="1">
                        1
                    </option>
                    <option value="2">
                        2
                    </option>

                </select>
            </div>

        );
    }
}
export default SelectDigLevel;