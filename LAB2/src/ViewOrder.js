import React, { Component } from 'react';
//import { Table, thead} from 'bootstrap';


class ViewOrder extends Component {

  render() {

    let order = this.props.order;
    console.log("vieworder fick", order)
    return (
      <ul className="list-group">
        <li className="list-group-item list-group-item-secondary">Order</li>
        {order.map((e) => <li className="list-group-item list-group-item-success" 
        key={'_' + Math.random().toString(36).substr(2, 9)}>{e}</li>)}
      </ul>
    )
  }
}


export default ViewOrder

// {data.map((x, i) => row(x, i, header))}