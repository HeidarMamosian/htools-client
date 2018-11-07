import React from "react";
import { NavLink } from "react-router-dom";
import "../App.css";
class Navigation extends React.Component {
  render() {
    return (
      <div className="sticky-top">
        <nav className="navbar   navbar-expand-md  navbar-dark bg-primary">
          <NavLink className="myfont navbar-brand" to="/">
            HTools
          </NavLink>
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" to="/lexranksummary">
                LexRank-Summarizer
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/textranksummary">
                TextRank-Summarizer
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/scraper">
                Scraper
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default Navigation;
