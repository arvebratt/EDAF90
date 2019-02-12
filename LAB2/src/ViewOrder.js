import React from 'react';
import { Table, thead} from 'react-bootstrap';

const row = (x, i, header) =>
  <tr key={`tr-${i}`}>
    {header.map((y, k) =>
      <td key={`trc-${k}`}>
        {x[y.prop].toString()}
      </td>
    )}
</tr>;
 
export default ({data, header}) =>
<Table striped bordered hover>
  <thead>
    <tr>
      {
        header.map((x,i) => <th key={i}>{x.name}</th>)
      }
    </tr>
  </thead>
  <tbody>
    {data.map((x, i) => row(x, i, header))}
  </tbody>
</Table>;