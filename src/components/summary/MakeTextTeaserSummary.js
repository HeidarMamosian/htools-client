import React, { Component } from "react";
import axios from "axios";
import { RingLoader } from "react-spinners";
import {Redirect} from 'react-router-dom';
import consts from "../../consts";


class MakeTextTeaserSummary extends Component {
  state = {
    redirect:false,
    Text: "",
    concept : "",
    Sentences: [],
    OnProcess: false
  };

  fileUploadHandler = () => {
    this.setState({ OnProcess: true });
    const fd = new FormData();
    fd.append("file", this.props.selectedFile, this.props.selectedFile.name);
    fd.append("title", this.props.concept);
    fd.append("stopwords", this.props.stopwords);
    fd.append("sentencenumber", this.props.sentencenumber);

    axios
      .post(consts.api + "/textteaser/", fd, {
        onUploadProgress: prg => {
          console.log("prog: " + Math.round((prg.loaded / prg.total) * 100));
        }
      })
      .then(res => {
        console.log(res.data);
        this.setState(() => ({
          Text: res.data.Text,
          Keywords : res.data.keywords,
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
         {this.state.redirect ? <Redirect to= { {pathname:'/summaryresult' , state:{ sentences: this.state.Sentences, text:this.state.Text,concept:this.props.concept , title:"Text Summarization Result (Text Teaser)"}} } /> : ""}
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
export default MakeTextTeaserSummary;
