import React, { Component } from "react";
import axios from "axios";
import { RingLoader } from "react-spinners";
import {Redirect} from 'react-router-dom';
import consts from "../../consts";


class MakeSummary extends Component {
  state = {
    redirect:false,
    Text: "",
    Sentences: [],
    OnProcess: false
  };

  fileUploadHandler = () => {
    this.setState({ OnProcess: true });
    const fd = new FormData();
    fd.append("file", this.props.selectedFile, this.props.selectedFile.name);
    fd.append("stopwords", this.props.stopwords);
    fd.append("threshold", this.props.threshold);
    fd.append("sentencenumber", this.props.sentencenumber);

    
    console.log(fd);
    axios
      .post(consts.api + "/lexrank/", fd, {
        onUploadProgress: prg => {
          console.log("prog: " + Math.round((prg.loaded / prg.total) * 100));
        }
      })
      .then(res => {
        console.log(res.data);
        this.setState(() => ({
          Text: res.data.Text,
          Sentences: res.data.Sentences,
          OnProcess: false,
        }));
      }).then(()=>{
        this.setState({redirect:true})
      })
      .catch(err => {
        this.setState({ OnProcess: false });

        console.log("err:", err, JSON.stringify(err));
      });
  };

  render() {
    
    return (
      <div>
         {this.state.redirect ? <Redirect to= { {pathname:'/summaryresult' , state:{ sentences: this.state.Sentences, text:this.state.Text, title:"Text Summarization Result (Lex Rank)"}} } /> : ""}
        <button
          onClick={() => {
            this.fileUploadHandler();
          }}
          className="btn btn-success"
        >
          Generate Summary
        </button>
        <RingLoader
          className="container"
          sizeUnit={"px"}
          size={30}
          color={"#123abc"}
          loading={this.state.OnProcess}
        />

      </div>
    );
  }
}
export default MakeSummary;
