import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ComposeSalad from "./ComposeSalad";
import './App.css';
import ViewOrder from "./ViewOrder";

class App extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      data: [],
      inventory: {}
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    var saladOrder = JSON.parse(localStorage.getItem('saladOrders'))
    if (saladOrder != null) {
      this.setState({ data: saladOrder })
    }

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
    }))
      .then(() => this.setState({ inventory }));
  }

  onSubmit = (e) => {
    this.setState({ data: [...this.state.data, e] },
      () => {
        return localStorage.setItem('saladOrders', JSON.stringify(this.state.data));
      });

    this.postData('http://localhost:8080/orders/', { e })
      .then(data => console.log(JSON.stringify(data)))
      .catch(error => console.error(error));
  }

  postData(url = '', data = {}) {
    return fetch(url, {
      method: "POST", 
      // mode: "cors",
      // cache: "no-cache",
      // credentials: "same-origin",
      // headers: "",
      // redirect: "follow", 
      // referrer: "no-referrer", 
      body: JSON.stringify(data),
    })
      .then(response => response.json());
  }

  render() {
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
          <div className="jumbotron-text-center">
            <h1 className="display-4">Salad Maker 2000</h1>
            <p className="lead">
              Hosshuset AB
          </p>
          </div>
          <Route path='/ComposeSalad' render={composeSaladElem} />
          <Route path='/ViewOrder' render={viewOrderElem} />
        </div>
      </Router>
    );
  }
}


const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

export default App