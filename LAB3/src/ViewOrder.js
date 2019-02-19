import React, { Component } from 'react';
//import { Table, thead} from 'bootstrap';


class ViewOrder extends Component {

  render() {
    let order = this.props.order;

    console.log("vieworder fick", order)
    return (
      <div className="container">
        <table className="table">
          <thead>
            <tr>
              <th>Bas</th>
              <th>Protein</th>
              <th>Extra</th>
              <th>Dressing</th>
              <th>Pris</th>
            </tr>
          </thead>
          <tbody>
            {order.map((e) => <tr>
              <td>{e.foundation}</td>
              <td>{e.protein}</td>
              <td>{e.extra}</td>
              <td>{e.dressing}</td>
              <td>{e.price + ' Kr'}</td>
            </tr>)}
          </tbody>
        </table>
      </div>

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





