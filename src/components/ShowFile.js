import React, { Component } from 'react';
import ReactModal from 'react-modal';


// function download(filename, text) {
//     var element = document.createElement('a');
//     element.setAttribute('href', 'data:application/octet-stream;charset=utf-8,' + encodeURIComponent(text));
//     element.setAttribute('download', `${filename}.txt`);

//     element.style.display = 'none';
//     document.body.appendChild(element);

//     element.click();

//     document.body.removeChild(element);
// }


function save(filename, data) {
    var blob = new Blob([data], { type: 'text/csv' });
    if (window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveBlob(blob, filename);
    }
    else {
        var elem = window.document.createElement('a');
        elem.href = window.URL.createObjectURL(blob);
        elem.download = filename;
        document.body.appendChild(elem);
        elem.click();
        document.body.removeChild(elem);
    }
}

class ShowFile extends Component {
    constructor() {
        super();
        this.state = {
            showModal: false
        };

        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.handelSaveText = this.handelSaveText.bind(this);

    }

    handleOpenModal() {
        this.setState({ showModal: true });
    }

    handleCloseModal() {
        this.setState({ showModal: false });
    }


    handelSaveText() {
        save(this.props.page.url, this.props.page.text)
    }
    render() {
        return (
            <div>
                <small>
                    <button onClick={this.handleOpenModal} className="btn btn-success">Show Text</button>
                </small>
                <ReactModal
                    isOpen={this.state.showModal}
                    contentLabel="Minimal Modal Example"
                >
                    <button onClick={this.handleCloseModal} className='btn btn-danger'>Close</button>
                    <button onClick={this.handelSaveText} className="btn btn-success">Save Text</button>
                    <br />
                    {this.props.page.text}

                </ReactModal>
            </div>
        );
    }
}

export default ShowFile;
