import React, { Component } from 'react';


const isURL = (str) => {
    var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return pattern.test(str);
  }

  
class AddUrls extends Component {
    handelFormSubmit = (e) => {
        e.preventDefault();
        const text = e.target.elements.urls.value;
        if (!text) {
            alert("Please Enter URLS!");
            return;
        }
        const arrayOfUrls = text.match(/[^\r\n]+/g);
        arrayOfUrls.forEach(element => {
            console.log(isURL(element));
        });
    
            
    }
    render() {
        return (
            <div>
                <form onSubmit={this.handelFormSubmit}>
                    <h6>Links</h6>
                    <textarea name="urls" className="form-control" rows="7">
                    </textarea>
                    <button type="submit" className="btn btn-info">Process</button>
                </form>
            </div>
        );
    }
}

export default AddUrls;
