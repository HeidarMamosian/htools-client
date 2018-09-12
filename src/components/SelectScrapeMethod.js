import React, { Component } from 'react';

class SelectScrapeMethod extends Component {

    render() {
        const {defaultScrapeMethod,updateMethod}=this.props;
        return (
            <div >
                <h6>Scrape Method</h6>
                <select className="form-control"
                    value={defaultScrapeMethod}
                    id="dataSourceSelect"
                    onChange={event => updateMethod(event.target.value)}
                >
                    {/* <option value="all">
                        All
                    </option> */}
                    <option value="html2text">
                        Html2Text
                    </option>
                    <option value="goose">
                        Goose
                    </option>

                </select>
            </div>

        );
    }
}
export default SelectScrapeMethod;