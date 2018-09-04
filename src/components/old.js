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
// End of Utilities Functions
class WebScrape extends Component {
    state = {
        showStart: false,
        links: [],
        Onprocess: false,
        pages: []

    }

    setProcessFlagOnOff = (flag) => {
        this.setState(() => ({ Onprocess: flag }));
    }
    handelStartClick = () => {
        this.setProcessFlagOnOff(true);
        console.log('Start Clicked.');
        const uniqueLinks = this.state.links.filter(onlyUnique);
        console.log(uniqueLinks);
        Promise.all(uniqueLinks.map(url => {
            return getTextofPage(url).then(page => {
                this.setState((prvState) => {
                    page.uuid = uuid.v1();
                    return { pages: prvState.pages.concat([page]) }
                });
            });
        })).then(() => {
            console.log('Here.........');
            this.setProcessFlagOnOff(false)
        });

    }

    changelinksresult = (result, links) => {
        console.log(result);
        this.setState((preState) => ({ showStart: result, links }));
    }

    render() {
        return (
            <div className='container'>
                <Header />
                <Links changelinksresult={this.changelinksresult} />
                <br />
                {this.state.Onprocess && <p className="text-warning">Process is started ...</p>}
                {this.state.showStart && <button onClick={this.handelStartClick} className="btn btn-primary">Start Scraping</button>}

                <PagesList pages={this.state.pages} />
            </div>
        );
    }
}
export default WebScrape;