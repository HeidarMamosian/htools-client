import React, { Component } from 'react';
import PageRow from './PageRow'

class PagesList extends Component {

  render() {
    return (
      <div className="PagesList">
        <table className="table table-bordered table-striped">
          <thead className="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Page</th>
              <th scope="col">Status</th>
              <th scope="col">Text</th>
            </tr>
          </thead>
          <tbody>
            {this.props.pages.map(p =>{
            
             return ( <PageRow page = {p} key={p.uuid} handleCheckboxChange = { this.props.handleCheckboxChange }/>);
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default PagesList;
