import React, { Component } from 'react';
// import Checkbox from './Checkbox';
import ShowFile from './ShowFile';
class PageRow extends Component {

  render() {
    return (

      <tr>
        {/* <td > <Checkbox label={this.props.page.uuid}  handleCheckboxChange = {this.props.handleCheckboxChange }/></td>
    */}
    <td>#</td>
        <td >{this.props.page.url}</td>
        <td >{this.props.page.status}</td>
        <td > <ShowFile page={this.props.page} /></td>

      </tr>

    );
  }
}

export default PageRow;
