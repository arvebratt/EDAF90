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
//       <div class="container">
// <div class="row">
//   <div class="col-sm">
//     Bas
//   </div>
//   <div class="col-sm">
//     Protein
//   </div>
//   <div class="col-sm">
//     Extra
//   </div>
//   <div class="col-sm">
//     Dressing
//   </div>
//   <div class="col-sm">
//     Pris
//   </div>
// </div>
// </div>
    )
  }
}


export default ViewOrder





