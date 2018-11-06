import React, { Component } from 'react';

class Header extends Component {

    render() {
        return (
            <div>
                <br />
                <nav className="navbar navbar-light bg-light">
                    <span className="navbar-brand mb-0 h1">{this.props.title}</span>
                </nav>
                <br />
            </div>
        );
    }
}
export default Header;