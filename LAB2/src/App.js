import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
// import $ from "jquery"; // skip this if you do not use bootstrap modals
// import Popper from "popper.js"; // skip this if you do not use bootstrap modals

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
            Hosshuset AB
          </p>
        </div>
        <ComposeSaladModal inventory={inventory} />
        <table Style="width:100%">
          <tr>
            <th>Bas</th>
            <th>Protein</th>
            <th>Tillbehör</th>
            <th>Dressing</th>
            <th>Pris</th>
          </tr>
          <tr>
            <td>Sallad</td>
            <td>Kyckling</td>
            <td>Gurka, Avacado, Oliver</td>
            <td>Rhodeisland</td>
            <td>45 kr</td>
          </tr>
          <tr>
          </tr>
        </table>
      </div>
    );
  }
}


const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

export default App;
