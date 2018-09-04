import React, { Component } from 'react';
import uuid from 'uuid';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import fetch from "isomorphic-fetch";
import AddUrl from './AddUrl';
import PagesList from './PagesList'
import consts from "../consts";

function getTextofPage(url) {
  let fetch_url = consts.api + "/" + encodeURIComponent(url);
  return fetch(fetch_url
    , {
      method: "GET"
    }).then((response) => {
      if (response.status === 200) {
        return response.json();
      }
      throw response.error;
    });
}


function getLinksofPage(url) {
  let fetch_url = consts.api + "/links/" + encodeURIComponent(url);
  return fetch(fetch_url
    , {
      method: "GET"
    }).then((response) => {
      if (response.status === 200) {
        return response.json();
      }
      throw response.error;
    });
}

class TextScrape extends Component {
  componentWillMount = () => {
    this.selectedCheckboxes = new Set();
  }

  state = {
    pages: [],
    msg: ''
  }

  toggleCheckbox = label => {
    if (this.selectedCheckboxes.has(label)) {
      this.selectedCheckboxes.delete(label);
    } else {
      this.selectedCheckboxes.add(label);
    }
  }


  changeExecuteMode = (mode) => {
    switch (mode) {
      case "Fetching":
        this.setState({ msg: 'On progress...' });
        break;
      case "Finish":
        this.setState({ msg: 'Finished' });
        break;
      default:
        this.setState({ msg: '' });
    }

  }
  handelAddPage = (page) => {
    console.log("handelAddPage");
    this.changeExecuteMode('Fetching');

    getTextofPage(page).then((d) => {
      this.setState((prvState) => {

        d.uuid = uuid.v1();
        return { pages: prvState.pages.concat([d]) }
      });

    });

    getLinksofPage(page).then((d) => {
      const p = d.links.map((link) => {
        return getTextofPage(link).then((d) => {
          this.setState((prvState) => {
            d.uuid = uuid.v1();
            return { pages: prvState.pages.concat([d]) }
          });

        });

      });

      Promise.all(p).then(this.changeExecuteMode('Finish'));
    });
  }


  handelDownloadZip = () => {
    let zip = new JSZip();

    if (this.selectedCheckboxes.size === 0) {
      alert('No pages selected!\n Please select the pages you want to download their text content.');
      return;
    }
    for (const selectedpage of this.selectedCheckboxes) {
      const file = this.state.pages.filter(page => page.uuid === selectedpage)[0];
      zip.file(encodeURIComponent(file.url) + ".txt", file.text);
    }

    // for (let i = 0; i < this.state.pages.length; i++) {
    //   zip.file(encodeURIComponent(this.state.pages[i].url) + ".txt", this.state.pages[i].text);
    // }
    const filename = prompt("Please enter file name", "example.zip");
    zip.generateAsync({ type: "blob" }).then(function (blob) { // 1) generate the zip file

      saveAs(blob, filename);                          // 2) trigger the download
    });

  }

  handelDownloadAllZip = () => {
    let zip = new JSZip();

    // if (this.selectedCheckboxes.size === 0) {
    //   alert('No pages selected!\n Please select the pages you want to download their text content.');
    //   return;
    // }
    // for (const selectedpage of this.selectedCheckboxes) {
    //   const file = this.state.pages.filter(page => page.uuid === selectedpage)[0];
    //   zip.file(encodeURIComponent(file.url) + ".txt", file.text);
    // }

    for (let i = 0; i < this.state.pages.length; i++) {
      zip.file(encodeURIComponent(this.state.pages[i].url) + ".txt", this.state.pages[i].text);
    }
    const filename = prompt("Please enter file name", "example.zip");
    zip.generateAsync({ type: "blob" }).then(function (blob) { // 1) generate the zip file

      saveAs(blob, filename);                          // 2) trigger the download
    });

  }

  render() {
    return (
      <div className="TextScrape">
        <div className="container">
          <button onClick={this.handelDownloadZip} className="btn btn-success">Zip File</button>
          <button onClick={this.handelDownloadAllZip } className="btn btn-success">Zip All Files</button>
          <AddUrl handelAddPage={this.handelAddPage} />
          <br />
          {this.state.msg}
          <PagesList pages={this.state.pages} handleCheckboxChange={this.toggleCheckbox} />
          {this.state.pages.length}
        </div>
      </div>
    );
  }
}

export default TextScrape;
