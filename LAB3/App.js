import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
// import $ from "jquery"; // skip this if you do not use bootstrap modals
// import Popper from "popper.js"; // skip this if you do not use bootstrap modals

// import ComposeSaladModal from "./ComposeSaladModal";
import ComposeSalad from "./ComposeSalad";
import './App.css';
import ViewOrder from "./ViewOrder";
//import { promised } from "q";

class App extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      data: [],
      inventory: {}
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount(){
    //var newKey = JSON.parse(localStorage.getItem('itemKey'))
    //if(newKey != null){
      //this.setState({data: newKey})
   // }
   console.log(JSON.parse(localStorage.getItem('itemKey')));

    var server = 'http://localhost:8080/';
    var urls = ['foundations', 'proteins', 'extras', 'dressings'];
    var inventory = {};

    Promise.all(urls.map(url => {
      return fetch(server + url)
      .then(response => response.json())
      .then(items => {
        return Promise.all(items.map(item => {
          return fetch(server + url + '/' + item)
          .then(response => response.json())
          .then(contents => inventory[item] = contents)
        }))
      })
    })).then(() => this.setState({inventory}));
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
    this.setState(this.makeDataArray(e), () => localStorage.setItem('itemKey', JSON.stringify(this.state.data)));
    console.log("state", this.state.data);

  this.postData('http://localhost:8080/orders/', {e})
  .then(data => console.log(JSON.stringify(data))) // JSON-string from `response.json()` call
  .catch(error => console.error(error));
  }

  postData(url = ``, data = {}) {
    // Default options are marked with *
      return fetch(url, {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          mode: "cors", // no-cors, cors, *same-origin
          cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
          credentials: "same-origin", // include, *same-origin, omit
          headers: {
              //"Content-Type": "application/json",
              // "Content-Type": "application/x-www-form-urlencoded",
          },
          redirect: "follow", // manual, *follow, error
          referrer: "no-referrer", // no-referrer, *client
          body: JSON.stringify(data), // body data type must match "Content-Type" header
      })
      .then(response => response.json()); // parses response to JSON
  }

  render() {
    console.log("consoleloggarn i render fick", this.state.data)
    const composeSaladElem = (params) => <ComposeSalad {...params} inventory={this.state.inventory}
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