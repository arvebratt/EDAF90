import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import $ from "jquery"; // skip this if you do not use bootstrap modals
import Popper from "popper.js"; // skip this if you do not use bootstrap modals

import inventory from "./inventory.ES6";
import ComposeSaladModal from "./ComposeSaladModal";
import './App.css';
 
class App extends React.Component {
  render() {
    return (
      <div>
        <div className="jumbotron text-center">
          <h1 className="display-4">Salad Maker 2000</h1>
          <p className="lead">
            Komponera din egen sallad
          </p>
        </div>
        <ComposeSaladModal inventory={inventory} />
      </div>
    );
 }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

export default App;
