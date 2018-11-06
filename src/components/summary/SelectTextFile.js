import React, { Component } from "react";

class SelectTextFile extends Component {
  render() {
    const { selectedFile  } = this.props;
    return (
      <div>
        <h6>Select File</h6>
        <input
          type="file"
          onChange={this.props.fileSelectedHandler}
          style={{ display: "none" }}
          ref={inputFile => (this.inputFile = inputFile)}
          accept=".txt"
        />
        <button
          onClick={() => {
            this.inputFile.click();
          }}
          className="btn"
        >
          Choose File
        </button>
        
      
        <span className="alert">{ selectedFile}</span>
        {/* <button onClick={this.fileUploadHandler} className="btn btn-primary">
          Upload
        </button>
        <div className="panel panel-default">
          <div className="panel-heading">
            {this.state.selectedFile && this.state.selectedFile.name}{" "}
          </div>
          <div className="panel-body article">{this.state.Text}</div>
        </div> */}
      </div>
    );
  }
}
export default SelectTextFile;
