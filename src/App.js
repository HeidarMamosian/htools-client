import React, { Component } from "react";
import WebScraper from "./components/WebScraper";
import LexRankSummary from "./components/summary/LexRankSummary";
import { BrowserRouter, Switch, Route, Link, NavLink } from "react-router-dom";
import Navigation from "./components/Navigation";
import SummaryResult from "./components/summary/summaryResult";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Navigation />
          <Switch>
            <Route path="/" exact={true} component={WebScraper} />
            <Route path="/scraper"  component={WebScraper} />
            <Route path="/summary" component={LexRankSummary} />
            <Route path="/summaryresult" component={SummaryResult} />

          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
