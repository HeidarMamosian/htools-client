import React, { Component } from 'react';
import consts from "../consts";

const isURL = (str) => {
    var pattern = new RegExp('^(https?:\\/\\/)' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return pattern.test(str);
}

async function checkUrl(url) {
    let fetch_url = consts.api + "/" + encodeURIComponent(url);
    console.log('------------------------')
    console.log(consts.api)
    console.log(fetch_url)
    console.log('------------------------')

    const response = await fetch(fetch_url, { method: "GET" });
    const json = await response.json();
    return json.status;
}

class Links extends Component {
    state = {
        OKpages:[],
        NotOkpages:[]
    };

        checkUrlSyntax = (arrayOfUrls)=>{          
            for(let i=0; i<arrayOfUrls.length; i++){
                if (!isURL(arrayOfUrls[i].trim())) {
                    console.log(arrayOfUrls[i]);
                    const txturls = document.getElementById("urls");
                    txturls.classList.add("is-invalid");
                    const element = document.getElementById("err_msg");
                    element.innerHTML = `<li class='text-danger'>       Address ${arrayOfUrls[i]} is not valid.</li>`;
                    return 0;
                }}
            return 1;
        }
 
    handelFormSubmit = (e) => {
        e.preventDefault();

        const txturls = document.getElementById("urls");
        txturls.classList.remove("is-invalid");
        const element = document.getElementById("err_msg");
        element.innerHTML = "";


        const text = e.target.elements.urls.value;
        if (!text) {
            alert("Please Enter URLS!");
            return;
        }
        
        const arrayOfUrls = text.match(/[^\r\n]+/g);
        if (!arrayOfUrls) { return; }
        if (this.checkUrlSyntax(arrayOfUrls)===0)
        {
            return;
        }

        const err_msg = document.getElementById("err_msg");
        err_msg.innerHTML = `<li class='text-danger'>       Please wait. All links will be checked...</li>`;
        const p = arrayOfUrls.map((url) => (checkUrl(url)));
        Promise.all(p).then(p => {
            console.log(p);
            let AllOk = true;
            for (let i = 0; i < arrayOfUrls.length; i++) {
                if (p[i] !== 200) {
                    const element = document.getElementById("err_msg");
                    element.innerHTML += `<li class='text-danger'>       Address ${arrayOfUrls[i]} dose not work.(${p[i]}).</li>`;
                    AllOk = false;
                }
            }
            if(AllOk){
                console.log('all ok');
                const element = document.getElementById("err_msg");
                element.innerHTML = `<li class='text-success'> It seems all links look good.</li>`;
                this.props.changelinksresult(true,arrayOfUrls);
            }else{
                this.props.changelinksresult(false, []);
            }
        }
        ).catch(e => { console.log(e)
            this.props.changelinksresult(false,[]);
        });
    }
    render() {
        return (
            <div>
                <form onSubmit={this.handelFormSubmit}>
                    <label htmlFor="txtUrl">Links</label>
                    <textarea name="urls" className="form-control" id="urls" rows="7" placeholder="Enter your URLs. (Enter every address in a seperate line)">
                    </textarea>
                    <small id="emailHelp" className="form-text text-muted">Enter the home page address of each website (e.g. http://www.example.com).</small>
                    <ul id='err_msg'>
                    </ul>
                    <button type="submit" className="btn btn-info">Check Links</button>

                </form>
            </div>
        );
    }
}
export default Links;