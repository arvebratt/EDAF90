import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
// import $ from "jquery"; // skip this if you do not use bootstrap modals
// import Popper from "popper.js"; // skip this if you do not use bootstrap modals

import inventory from "./inventory.ES6";
import ComposeSaladModal from "./ComposeSaladModal";
import './App.css';
import Table from './ViewOrder';

class App extends React.Component {
  constructor(...args){
    super(...args);
    this.state = {
      data: [""]
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit = (e) => {
    console.log("app fick", e);
    this.setState({data: [...this.state.data, e]})
    console.log("state", this.state.data);

  }

  render() {
    return (
      <div>
        <div className="jumbotron text-center">
          <h1 className="display-4">Salad Maker 2000</h1>
          <p className="lead">
            Hosshuset AB
          </p>
        </div>
        <ComposeSaladModal inventory={inventory} onSubmit={e => this.onSubmit(e)} />
        <Table data={this.state.data} header={[
    {
      name :'Foundation',
      prop: 'foundation',
    },
    {
      name: 'Protein',
      prop: 'protein',
    },
    {
      name: 'Extras',
      prop: 'extra',
    },
    {
      name:'Dressing',
      prop: 'dressing',
    },
    {
      name: 'Price',
      prop: 'price',
    }
  ]} />;
      </div>
    );
  }
}


const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

export default App