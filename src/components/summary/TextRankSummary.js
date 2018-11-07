import React, { Component } from "react";
import Header from "../Header";
import SelectSentenceNumber from "./SelectSentenceNumber";
import SelectRatio from "./SelectRatio";
import SelectTextFile from "./SelectTextFile";
import MakeTextRankSummary from "./MakeTextRankSummary";
import "../../App.css";

class TextRankSummary extends Component {
  state = {
    src: "",
    value: "",
    selectedFile: undefined,
    sentenceNumber: 10,
    ratio: 0.05,
  };


  handleUpdateRatio = value => {
    this.setState(() => ({ ratio: value }));
  };

  fileSelectedHandler = event => {
    if (window.FileReader) {
      let file = event.target.files[0],
        reader = new FileReader(),
        self = this;
      reader.onload = function(r) {
        self.setState({
          src: r.target.result
        });
      };
      reader.readAsText(file);
      self.setState({ value: reader });
    } else {
      alert("Soryy, your browser does'nt support for preview");
    }
    this.setState({
      selectedFile: event.target.files[0],
      selectedFileName: event.target.files[0].name
    });
  };

  render() {
    return (
      <div className="container">
        <Header title="TextRank Summarizer" />
        <div className="row form-group">

          <div className="col">
            <SelectRatio
              defaultRatio={this.state.ratio}
              updateMethod={this.handleUpdateRatio}
            />
          </div>
        </div>

        <div className="row form-group">
          <div className="col">
            <SelectTextFile
              fileSelectedHandler={this.fileSelectedHandler}
              selectedFile={this.state.selectedFileName}
            />
          </div>
        </div>
        {this.state.selectedFile && (

        <div>
          <div className="row form-group">
            <div className="col">
              <h5>
                <b>Original Text</b>
              </h5>
            </div>
          </div>
          <div className="row form-group">
          <div className="col">
            {this.state.selectedFile && (
              <MakeTextRankSummary
                selectedFile={this.state.selectedFile}
                handelgenerateSummary={this.handelGenerateSummary}
                sentencenumber={this.state.sentenceNumber}
                ratio={this.state.ratio}
              />
            )}
          </div>
        </div>
          <div className="row form-group">
            <div className="src-text col-12">{this.state.src}</div>
          </div>
        </div>)}
       
      </div>
    );
  }
}

export default TextRankSummary;
