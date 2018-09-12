import React, { Component } from 'react';

class ScrapeSettings extends Component {

    render() {
        const { min_value } = this.props;

        return (
            <div>
                <form>
                    <div className="row">
                    <div className="col">
                            Minimum length:
                            <input className="form-control" type='number'
                                id="minlength" name="minlength" min="10" step="5"
                                defaultValue={this.props.min_value}></input>

                        </div>
                        <div className="col">
                            Minimum length:
                            <input className="form-control" type='number'
                                id="minlength" name="minlength" min="10" step="5"
                                defaultValue={this.props.min_value}></input>

                        </div>
                        <div className="col">
                            Minimum length:
                            <input className="form-control" type='number'
                                id="minlength" name="minlength" min="10" step="5"
                                defaultValue={this.props.min_value}></input>

                        </div>
                    </div>

                    Method:
                    <div>
                        <select className="form-control"
                            // value={defaultsAndQuery.source}
                            id="dataSourceSelect"
                        // onChange={event => updateQuery("source", event.target.value)}
                        >
                            <option value="obj">
                                OBJ
                    </option>
                            <option value="tim">
                                TIM
                    </option>
                            <option value="gers">
                                GERS
                    </option>
                            <option value="ispim">
                                ISPIM
                    </option>
                            <option value="file">
                                File Upload
                    </option>
                            <option value="link">
                                Link list
                    </option>
                            <option value="sheet">
                                SpreadSheet
                    </option>
                        </select>
                    </div>
                </form>
            </div>
        );
    }
}
export default ScrapeSettings;