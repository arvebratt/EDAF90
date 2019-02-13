import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
// import $ from "jquery"; // skip this if you do not use bootstrap modals
// import Popper from "popper.js"; // skip this if you do not use bootstrap modals

import inventory from "./inventory.ES6";
// import ComposeSaladModal from "./ComposeSaladModal";
import ComposeSalad from "./ComposeSalad";
import './App.css';
import ViewOrder from "./ViewOrder";

class App extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      data: []
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  makeDataArray = (e) => {
    this.setState({
      data: [...this.state.data,
      e.foundation + ", " +
      e.protein + ", " +
      e.extra + ", " +
      e.dressing + ", " +
      e.price + " kr"]
    });
  }

  onSubmit = (e) => {
    console.log("app fick", e);
    this.setState(this.makeDataArray(e));
    console.log("state", this.state.data);
  }

  render() {
    console.log("consoleloggarn i render fick", this.state.data)
    const composeSaladElem = (params) => <ComposeSalad {...params} inventory={inventory}
    onSubmit={e => this.onSubmit(e)} />;
    const viewOrderElem = (params) => <ViewOrder {...params} order={this.state.data} />;
    return (
      <Router>
        <div>
          <ul className="nav nav-pills">
            <li className="nav-item">
              <Link className="nav-link" to='/ComposeSalad'>Komponera din egen sallad</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to='/ViewOrder'>Se din order</Link>
            </li>
          </ul>
          <div className="jumbotron text-center">
            <h1 className="display-4">Salad Maker 2000</h1>
            <p className="lead">
              Hosshuset AB
          </p>
          </div>
          <Route path='/ComposeSalad' render={composeSaladElem}/>
          <Route path='/ViewOrder' render={viewOrderElem}/>
        </div>
      </Router>
    );
  }
}


const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

export default App