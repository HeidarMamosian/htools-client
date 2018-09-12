import React, { Component } from 'react';

class CheckUrls extends Component {
    
    render() {
        const {disabled,handleCheckUrls}=this.props;

        return (
            <div className="form-group">
                <button className="btn btn-primary" 
                disabled={disabled}
                onClick={handleCheckUrls}>Check Urls</button>
            </div>
        );
    }
}
export default CheckUrls;