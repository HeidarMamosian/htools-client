import React, { Component } from 'react';

class ScrapeUrls extends Component {
    
    render() {
        const {disabled,handelScrapeUrls}=this.props;

        return (
            <div className="form-group">
                <button className="btn btn-success" 
                disabled={disabled}
                onClick={handelScrapeUrls}>Scrape Urls</button>
            </div>
        );
    }
}
export default ScrapeUrls;