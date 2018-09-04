import React, { Component } from 'react';
import uuid from 'uuid';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import fetch from "isomorphic-fetch";
import Header from './Header';
import Links from './Links';
import PagesList from './PagesList';
import consts from "../consts";


// Utilities Functions
function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}


function getTextofPage(url) {
    let fetch_url = consts.api + "/text/" + encodeURIComponent(url);
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

function extractHostname(url) {
    let hostname;
    //find & remove protocol (http, ftp, etc.) and get hostname

    if (url.indexOf("://") > -1) {
        hostname = url.split('/')[2];
    }
    else {
        hostname = url.split('/')[0];
    }

    //find & remove port number
    hostname = hostname.split(':')[0];
    //find & remove "?"
    hostname = hostname.split('?')[0];

    return hostname;
}

function extractRootDomain(url) {
    let domain = extractHostname(url),
        splitArr = domain.split('.'),
        arrLen = splitArr.length;

    //extracting the root domain here
    //if there is a subdomain 
    if (arrLen > 2) {
        domain = splitArr[arrLen - 2] + '.' + splitArr[arrLen - 1];
        //check to see if it's using a Country Code Top Level Domain (ccTLD) (i.e. ".me.uk")
        if (splitArr[arrLen - 2].length === 2 && splitArr[arrLen - 1].length === 2) {
            //this is using a ccTLD
            domain = splitArr[arrLen - 3] + '.' + domain;
        }
    }
    // Remove the # and the rest

    return domain.split('#')[0];
}
// End of Utilities Functions
class WebScrape extends Component {
    state = {
        showStart: false,
        links: [],
        Onprocess: false,
        btnZipVisible: false,
        pages: []

    }

    handelDownloadAllZip = () => {
        let zip = new JSZip();
        try {
            for (let i = 0; i < this.state.pages.length; i++) {
                zip.file(encodeURIComponent(this.state.pages[i].url).substring(1, 50) + ".txt", this.state.pages[i].text);
            }
        }
        catch (err) {
            alert(err.message);
        }

        const filename = prompt("Please enter file name", "example.zip");
        zip.generateAsync({ type: "blob" }).then(function (blob) { // 1) generate the zip file

            saveAs(blob, filename);                          // 2) trigger the download
        });

    }

    handelDownloadAllDirsZip = () => {
        console.log("handelDownloadAllDirsZip");
        let zip = new JSZip();
        this.state.pages.forEach(p => {
            zip.file(p.rootsite + "/" + encodeURIComponent(p.url).substring(1, 50) + ".txt", p.text);
        });


        const filename = prompt("Please enter file name", "example.zip");
        zip.generateAsync({ type: "blob" }).then(function (blob) { // 1) generate the zip file

            saveAs(blob, filename);                          // 2) trigger the download
        });

    }

    setProcessFlagOnOff = (flag) => {
        this.setState(() => ({ Onprocess: flag }));
    }

    handelStartClick = () => {

        this.setProcessFlagOnOff(true);
        console.log('Start Clicked.');
        const uniqueLinks = this.state.links.filter(onlyUnique);

        Promise.all(uniqueLinks.map(url => {
            return getTextofPage(url).then(page => {
                this.setState((prvState) => {
                    page.uuid = uuid.v1();
                    page.rootsite = extractRootDomain(page.url);
                    return { pages: prvState.pages.concat([page]) }
                });
            });
        }));
        Promise.all(uniqueLinks.map((url) => {
            return getLinksofPage(url).then((d) => {
                return Promise.all(d.links.map((link) => {
                    return getTextofPage(link).then((d) => {
                        this.setState((prevState) => {
                            d.uuid = uuid.v1();
                            d.rootsite = extractRootDomain(d.url);
                            return { pages: prevState.pages.concat([d]) }
                        });
                    });
                }));
            });
        })).then(() => {
            if (this.state.pages.length > 0) {
                this.setState(() => ({ btnZipVisible: true, showStart: false }));
            }
            this.setProcessFlagOnOff(false);
        }).catch(() => {
            if (this.state.pages.length > 0) {
                this.setState(() => ({ btnZipVisible: true, showStart: false }));
            }
            this.setProcessFlagOnOff(false);
        });






    }

    changelinksresult = (result, links) => {
        this.setState((preState) => ({ showStart: result, links }));
    }

    render() {
        return (
            <div className='container'>
                <Header />
                <Links changelinksresult={this.changelinksresult} />
                <br />
                {this.state.Onprocess && <p className="text-warning">Process is started ...<span>{this.state.pages.length}</span></p>}

                {}
                {this.state.showStart && <button onClick={this.handelStartClick} className="btn btn-primary">Start Scraping</button>}
                {this.state.btnZipVisible && <button onClick={this.handelDownloadAllZip} className="btn btn-success">Download All</button>}
                {this.state.btnZipVisible && <button onClick={this.handelDownloadAllDirsZip} className="btn btn-success">Download All (Dirs)</button>}
                <PagesList pages={this.state.pages} />
            </div>
        );
    }
}
export default WebScrape;