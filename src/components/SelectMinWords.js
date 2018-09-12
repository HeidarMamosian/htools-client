import React, { Component } from 'react';

class SelectMinWords extends Component {

    render() {
        const {defaultMinWords,updateMinWords}=this.props;
        return (
            <div >
                <h6 >Minimum Text Length (words)</h6>
                <input className="form-control"
                    type="number"
                    value={defaultMinWords}
                    onChange={event => updateMinWords(event.target.value)}
                />
            </div>
        );
    }
}
export default SelectMinWords;