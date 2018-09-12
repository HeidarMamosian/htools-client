import React, { Component } from "react";
import uuid from "uuid";
import { RingLoader } from "react-spinners";
import Header from "./Header";
import SelectScrapeMethod from "./SelectScrapeMethod";
import SelectMinWords from "./SelectMinWords";
import SelectDigLevel from "./SelectDigLevel";
import Links from "./Links";
import CheckUrls from "./CheckUrls";
import ScrapeUrls from "./ScrapeUrls";
import PagesList from "./PagesList";
import consts from "../consts";
import JSZip from "jszip";
import { saveAs } from "file-saver";

// Utility Functions
const isURL = str => {
  var pattern = new RegExp(
    "^(https?:\\/\\/)" + // protocol
    "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|" + // domain name
    "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
    "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
    "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator
  return pattern.test(str);
};

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

function extractRootDomain(url) {
  let domain = extractHostname(url),
    splitArr = domain.split("."),
    arrLen = splitArr.length;

  //extracting the root domain here
  //if there is a subdomain
  if (arrLen > 2) {
    domain = splitArr[arrLen - 2] + "." + splitArr[arrLen - 1];
    //check to see if it's using a Country Code Top Level Domain (ccTLD) (i.e. ".me.uk")
    if (
      splitArr[arrLen - 2].length === 2 &&
      splitArr[arrLen - 1].length === 2
    ) {
      //this is using a ccTLD
      domain = splitArr[arrLen - 3] + "." + domain;
    }
  }
  // Remove the # and the rest

  return domain.split("#")[0];
}
function extractHostname(url) {
  let hostname;
  //find & remove protocol (http, ftp, etc.) and get hostname

  if (url.indexOf("://") > -1) {
    hostname = url.split("/")[2];
  } else {
    hostname = url.split("/")[0];
  }

  //find & remove port number
  hostname = hostname.split(":")[0];
  //find & remove "?"
  hostname = hostname.split("?")[0];

  return hostname;
}

function getTextofPage(url) {
  let fetch_url = consts.api + "/text/" + encodeURIComponent(url);
  return fetch(fetch_url, {
    method: "GET"
  }).then(response => {
    if (response.status === 200) {
      return response.json();
    }
    throw response.error;
  });
}



function geGooseTextofPage(url) {
  let fetch_url = consts.api + "/goosetext/" + encodeURIComponent(url);
  return fetch(fetch_url, {
    method: "GET"
  }).then(response => {
    if (response.status === 200) {
      return response.json();
    }
    throw response.error;
  });
}
//
class WebScraper extends Component {
  constructor(props) {
    super(props);

    this.state = {
      scrapeMethod: "goose",
      MinWords: 50,
      DigLevel: 0,
      CheckUrls_enable: false,
      ScrapeUrls_enable: false,
      OnProcess: false,
      btnDownloadVisible: false,
      pages: [],
      links: [],
      links_l1: [],

      links_l2: []
    };
    this.handleUpdateMethod = this.handleUpdateMethod.bind(this);
    this.handleUpdateMinWords = this.handleUpdateMinWords.bind(this);
    this.handleUpdateDigLevel = this.handleUpdateDigLevel.bind(this);
    this.handleUrlsChange = this.handleUrlsChange.bind(this);
    this.handleCheckUrls = this.handleCheckUrls.bind(this);
  }

  handelDownloadAllZip = () => {
    let zip = new JSZip();
    try {
      for (let i = 0; i < this.state.pages.length; i++) {
        const file_length = this.state.pages[i].text.split(" ").length;
        if (file_length >= this.state.MinWords) {
          zip.file(
            encodeURIComponent(this.state.pages[i].url).substring(1, 100) +
              ".txt",
            this.state.pages[i].text
          );
        }
      }
    } catch (err) {
      alert(err.message);
    }

    const filename = prompt("Please enter file name", "example.zip");
    zip.generateAsync({ type: "blob" }).then(function(blob) {
      // 1) generate the zip file

      saveAs(blob, filename); // 2) trigger the download
    });
  };

  handleUpdateMethod(value) {
    this.setState(() => ({ scrapeMethod: value }));
  }

  handleUpdateMinWords(value) {
    this.setState(() => ({ MinWords: value }));
  }

  handleUpdateDigLevel(value) {
    this.setState(() => ({ DigLevel: value }));
  }

  handleUrlsChange(evt) {
    const isTrue = !!evt.target.value.trim();
    this.setState(() => ({
      CheckUrls_enable: isTrue,
      ScrapeUrls_enable: false
    }));
  }

  checkUrlSyntax = arrayOfUrls => {
    for (let i = 0; i < arrayOfUrls.length; i++) {
      if (!isURL(arrayOfUrls[i].trim())) {
        console.log(arrayOfUrls[i]);
        const txturls = document.getElementById("urls");
        txturls.classList.add("is-invalid");
        const element = document.getElementById("err_msg");
        element.innerHTML = `<li class='text-danger'>       Address ${
          arrayOfUrls[i]
        } is not valid.</li>`;
        return 0;
      }
    }
    return 1;
  };

  handleCheckUrls() {
    const txturls = document.getElementById("urls");
    txturls.classList.remove("is-invalid");
    const element = document.getElementById("err_msg");
    element.innerHTML = "";
    const text = txturls.value;
    if (!text) {
      alert("Please Enter URLS!");
      return;
    }
    const arrayOfUrls = text.match(/[^\r\n]+/g);
    if (!arrayOfUrls) {
      return;
    }

    if (this.checkUrlSyntax(arrayOfUrls) === 0) {
      return;
    }

    this.setState(() => ({
      ScrapeUrls_enable: true,
      links: arrayOfUrls
    }));

    // const err_msg = document.getElementById("err_msg");
    // err_msg.innerHTML = `<li class='text-danger'>       Please wait. All links will be checked...</li>`;
    // const p = arrayOfUrls.map((url) => (checkUrl(url)));
    // Promise.all(p).then(p => {
    //     console.log(p);
    //     let AllOk = true;
    //     for (let i = 0; i < arrayOfUrls.length; i++) {
    //         if (p[i] !== 200) {
    //             const element = document.getElementById("err_msg");
    //             element.innerHTML += `<li class='text-danger'>       Address ${arrayOfUrls[i]} dose not work.(${p[i]}).</li>`;
    //             AllOk = false;
    //         }
    //     }
    //     if(AllOk){
    //         console.log('all ok');
    //         const element = document.getElementById("err_msg");
    //         element.innerHTML = `<li class='text-success'> It seems all links look good.</li>`;
    //         this.props.changelinksresult(true,arrayOfUrls);
    //     }else{
    //         this.props.changelinksresult(false, []);
    //     }
    // }
    // ).catch(e => { console.log(e)
    //     this.props.changelinksresult(false,[]);
    // });
  }

  setProcessFlagOnOff = flag => {
    console.log(flag);
    this.setState(() => ({ OnProcess: flag }));
  };

  handleHtml2TextScrap = uniqueLinks => {
    Promise.all(
      uniqueLinks.map(url => {
        return getTextofPage(url).then(page => {
          this.setState(prevState => {
            return {
              links_l1: prevState.links_l1
                .concat(page.links)
                .filter(onlyUnique)
                .filter(x => !prevState.links.includes(x))
            };
          });
          this.setState(prvState => {
            page.uuid = uuid.v1();
            page.rootsite = extractRootDomain(page.url);
            return { pages: prvState.pages.concat([page]) };
          });
        });
      })
    ).then(() => {
      console.log("Level 01");

      if (this.state.DigLevel > 0) {
        Promise.all(
          this.state.links_l1.map(url => {
            return getTextofPage(url).then(page => {
              this.setState(prevState => {
                return {
                  links_l2: prevState.links_l2
                    .concat(page.links)
                    .filter(onlyUnique)
                    .filter(
                      x =>
                        !prevState.links_l1.includes(x) ||
                        !prevState.links.includes(x)
                    )
                };
              });
              this.setState(prvState => {
                page.uuid = uuid.v1();
                page.rootsite = extractRootDomain(page.url);
                return { pages: prvState.pages.concat([page]) };
              });
            });
          })
        ).then(() => {
          if (this.state.DigLevel > 1) {
            console.log("Level 02");

            Promise.all(
              this.state.links_l2.map(url => {
                return getTextofPage(url).then(page => {
                  // this.setState(prevState => {
                  //   return {
                  //     links_l2: prevState.links_l2
                  //       .concat(page.links)
                  //       .filter(onlyUnique)
                  //       .filter(
                  //         x =>
                  //           !prevState.links_l1.includes(x) ||
                  //           !prevState.links.includes(x)
                  //       )
                  //   };
                  // });
                  this.setState(prvState => {
                    page.uuid = uuid.v1();
                    page.rootsite = extractRootDomain(page.url);
                    return { pages: prvState.pages.concat([page]) };
                  });
                });
              })
            ).then(() => {
              console.log("finish");
              this.setProcessFlagOnOff(false);
              this.setState(() => ({
                btnDownloadVisible: true,
                OnProcess: false
              }));
            });
          } else {
            this.setProcessFlagOnOff(false);
            this.setState(() => ({
              btnDownloadVisible: true,
              OnProcess: false
            }));
          }
        });
      } else {
        this.setProcessFlagOnOff(false);
        this.setState(() => ({
          btnDownloadVisible: true,
          OnProcess: false
        }));
      }
    });
  };
  handleAllScrap = uniqueLinks => {
    alert("Not implimented yet!");
  };
 
 
//  Goose Library
  handleGooseScrap = uniqueLinks => {
      Promise.all(
        uniqueLinks.map(url => {
          return geGooseTextofPage(url).then(page => {
            this.setState(prevState => {
              return {
                links_l1: prevState.links_l1
                  .concat(page.links)
                  .filter(onlyUnique)
                  .filter(x => !prevState.links.includes(x))
              };
            });
            this.setState(prvState => {
              page.uuid = uuid.v1();
              page.rootsite = extractRootDomain(page.url);
              return { pages: prvState.pages.concat([page]) };
            });
          });
        })
      ).then(() => {
        console.log("Level 01");
  
        if (this.state.DigLevel > 0) {
          Promise.all(
            this.state.links_l1.map(url => {
              return geGooseTextofPage(url).then(page => {
                this.setState(prevState => {
                  return {
                    links_l2: prevState.links_l2
                      .concat(page.links)
                      .filter(onlyUnique)
                      .filter(
                        x =>
                          !prevState.links_l1.includes(x) ||
                          !prevState.links.includes(x)
                      )
                  };
                });
                this.setState(prvState => {
                  page.uuid = uuid.v1();
                  page.rootsite = extractRootDomain(page.url);
                  return { pages: prvState.pages.concat([page]) };
                });
              });
            })
          ).then(() => {
            if (this.state.DigLevel > 1) {
              console.log("Level 02");
  
              Promise.all(
                this.state.links_l2.map(url => {
                  return geGooseTextofPage(url).then(page => {
                    // this.setState(prevState => {
                    //   return {
                    //     links_l2: prevState.links_l2
                    //       .concat(page.links)
                    //       .filter(onlyUnique)
                    //       .filter(
                    //         x =>
                    //           !prevState.links_l1.includes(x) ||
                    //           !prevState.links.includes(x)
                    //       )
                    //   };
                    // });
                    this.setState(prvState => {
                      page.uuid = uuid.v1();
                      page.rootsite = extractRootDomain(page.url);
                      return { pages: prvState.pages.concat([page]) };
                    });
                  });
                })
              ).then(() => {
                console.log("finish");
                this.setProcessFlagOnOff(false);
                this.setState(() => ({
                  btnDownloadVisible: true,
                  OnProcess: false
                }));
              });
            } else {
              this.setProcessFlagOnOff(false);
              this.setState(() => ({
                btnDownloadVisible: true,
                OnProcess: false
              }));
            }
          });
        } else {
          this.setProcessFlagOnOff(false);
          this.setState(() => ({
            btnDownloadVisible: true,
            OnProcess: false
          }));
        }
      });
    };  

  handelScrapeUrls = () => {
    console.log("ok");
    this.setProcessFlagOnOff(true);
    console.log("Start Clicked.");
    const uniqueLinks = this.state.links.filter(onlyUnique);

    switch (this.state.scrapeMethod) {
      case "all":
        this.handleAllScrap(uniqueLinks);
        break;
      case "html2text":
        this.handleHtml2TextScrap(uniqueLinks);
        break;
      case "goose":
        this.handleGooseScrap(uniqueLinks);
        break;
      default:
        return;
    }

    // Promise.all(uniqueLinks.map(url => {
    //     return getTextofPage(url).then(page => {
    //         this.setState((prvState) => {
    //             page.uuid = uuid.v1();
    //             page.rootsite = extractRootDomain(page.url);
    //             return { pages: prvState.pages.concat([page]) }
    //         });
    //     });
    // }));

    // Promise.all(uniqueLinks.map((url) => {
    //     return getLinksofPage(url).then((d) => {
    //         return Promise.all(d.links.map((link) => {
    //             return getTextofPage(link).then((d) => {
    //                 this.setState((prevState) => {
    //                     d.uuid = uuid.v1();
    //                     d.rootsite = extractRootDomain(d.url);
    //                     return { pages: prevState.pages.concat([d]) }
    //                 });
    //             });
    //         }));
    //     });
    // })).then(() => {
    //     if (this.state.pages.length > 0) {
    //         this.setState(() => ({ btnZipVisible: true, showStart: false }));
    //     }
    //     this.setProcessFlagOnOff(false);
    // }).catch(() => {
    //     if (this.state.pages.length > 0) {
    //         this.setState(() => ({ btnZipVisible: true, showStart: false }));
    //     }
    //     this.setProcessFlagOnOff(false);
    // });
  };

  fileNumber = () => {
    return this.state.pages
      .map(p => p.text.split(" ").length)
      .filter(x => x >= this.state.MinWords).length;
  };

  render() {
    return (
      <div className="container">
        <Header />

        <div className="row form-group">
          <div className="col">
            <SelectScrapeMethod
              defaultScrapeMethod={this.state.scrapeMethod}
              updateMethod={this.handleUpdateMethod}
            />
          </div>
          <div className="col">
            <SelectMinWords
              defaultMinWords={this.state.MinWords}
              updateMinWords={this.handleUpdateMinWords}
            />
          </div>
          <div className="col">
            <SelectDigLevel
              DigLevel={this.state.DigLevel}
              UpdateDigLevel={this.handleUpdateDigLevel}
            />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <Links handleUrlsChange={this.handleUrlsChange} />
          </div>
        </div>
        <div className="row">
          <div className="col-md-2">
            <CheckUrls
              disabled={!this.state.CheckUrls_enable}
              handleCheckUrls={this.handleCheckUrls}
            />
          </div>
          <div className="col-md-2">
            <ScrapeUrls
              disabled={!this.state.ScrapeUrls_enable}
              handelScrapeUrls={this.handelScrapeUrls}
            />
          </div>
          <div className="col">
            {this.state.btnDownloadVisible && (
              <button
                onClick={this.handelDownloadAllZip}
                className="btn btn-success"
              >
                Download All
              </button>
            )}
          </div>
          <div className="col">
            Number of scraped page(s):{" "}
            <span className="badge badge-info">{this.fileNumber()}</span>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <RingLoader
              className="container"
              sizeUnit={"px"}
              size={30}
              color={"#123abc"}
              loading={this.state.OnProcess}
            />
            {this.state.OnProcess && (
              <span className="badge badge-info">
                {this.state.pages.length}
              </span>
            )}
          </div>
        </div>
        <div className="row">
          <div className="col">
            <PagesList pages={this.state.pages} />
          </div>
        </div>
      </div>
    );
  }
}
export default WebScraper;
