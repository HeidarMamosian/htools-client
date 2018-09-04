
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


class AddUrl extends Component {

  constructor(props) {
    super(props);
    this.handelCheckUrl = this.handelCheckUrl.bind(this);



    this.state = {
      hasError: false,
      errMsg: '',
      pages: []
    }
  }

  handelCheckUrl(e) {
    e.preventDefault();

    
    const text = e.target.elements.txtUrls.value;
    if (!text) {
        alert("Please Enter URLS!");
        return;
    }
    const arrayOfUrls = text.match(/[^\r\n]+/g);
    arrayOfUrls.forEach(murl => {
        console.log(isURL(murl));
        if (isURL(murl)) {
          this.setState({
            hasError: false,
            errMsg: ''
          });
          // getTextofPage(murl);
          this.props.handelAddPage(murl);
        } else {
          this.setState({
            hasError: true,
            errMsg: 'Invalid Url. Please Enter Valid URL.'
          });
        }
    });
   

  }
  render() {
    return (
      <div className="AddUrl">
        <br />
        <nav className="navbar navbar-light bg-light">
          <span className="navbar-brand mb-0 h1">Text Scrape</span>
        </nav>
        <br />


        <form onSubmit={this.handelCheckUrl} >
          <div className="form-group">
            <label htmlFor="txtUrl">Url</label>
            <textarea name="txtUrls" className="form-control" id="txtUrl" rows="7" placeholder="Enter your URLs">
            </textarea>

            <small id="emailHelp" className="form-text text-muted">Enter the parent page address fot text scraping.</small>
          </div>


          <button type='submit' className="btn btn-primary">Add Url</button>
          <div >
            {this.state.hasError && <p className="form-text text-warning">{this.state.errMsg}</p>}
          </div>

        </form>
      </div>
    );
  }
}

export default AddUrl;
