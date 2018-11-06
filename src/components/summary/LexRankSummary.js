import React, { Component } from "react";
import Header from "../Header";
import SelectSentenceNumber from "./SelectSentenceNumber";
import SelectThreshold from "./SelectThreshold";
import SelectStopwords from "./SelectStopwords";
import SelectTextFile from "./SelectTextFile";
import MakeSummary from "./MakeSummary";
import "../../App.css";

class LexRankSummary extends Component {
  state = {
    src: "",
    value: "",
    selectedFile: undefined,
    sentenceNumber: 10,
    threshold: 0.1,
    stopwords:
      "i,me,my,myself,we,our,ours,ourselves,you,you're,you've,you'll,you'd,your,yours,yourself,yourselves,he,him,his,himself,she,she's,her,hers,herself,it,it's,its,itself,they,them,their,theirs,themselves,what,which,who,whom,this,that,that'll,these,those,am,is,are,was,were,be,been,being,have,has,had,having,do,does,did,doing,a,an,the,and,but,if,or,because,as,until,while,of,at,by,for,with,about,against,between,into,through,during,before,after,above,below,to,from,up,down,in,out,on,off,over,under,again,further,then,once,here,there,when,where,why,how,all,any,both,each,few,more,most,other,some,such,no,nor,not,only,own,same,so,than,too,very,s,t,can,will,just,don,don't,should,should've,now,d,ll,m,o,re,ve,y,ain,aren,aren't,couldn,couldn't,didn,didn't,doesn,doesn't,hadn,hadn't,hasn,hasn't,haven,haven't,isn,isn't,ma,mightn,mightn't,mustn,mustn't,needn,needn't,shan,shan't,shouldn,shouldn't,wasn,wasn't,weren,weren't,won,won't,wouldn,wouldn't"
  };

  handleUpdateSentenceNumber = value => {
    this.setState(() => ({ sentenceNumber: value }));
  };

  handleStopwordsChange = value=>{
    this.setState(() => ({ stopwords: value }));
  }
  handleUpdatethreshold = value => {
    this.setState(() => ({ threshold: value }));
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
        <Header title="LexRank Summarizer" />
        <div className="row form-group">
          <div className="col">
            <SelectSentenceNumber
              defaultSentenceNumber={this.state.sentenceNumber}
              updateMethod={this.handleUpdateSentenceNumber}
            />
          </div>
          <div className="col">
            <SelectThreshold
              defaultThreshold={this.state.threshold}
              updateMethod={this.handleUpdatethreshold}
            />
          </div>
        </div>
        <div className="row form-group">
          <div className="col">
            <SelectStopwords
              defaultStopwords={this.state.stopwords}
              updateMethod={this.handleStopwordsChange}
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
              <MakeSummary
                selectedFile={this.state.selectedFile}
                handelgenerateSummary={this.handelGenerateSummary}
                sentencenumber={this.state.sentenceNumber}
                stopwords={this.state.stopwords}
                threshold={this.state.threshold}
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

export default LexRankSummary;
