import React, { useState } from "react";
import { Link } from "react-router-dom";
import shipmentsFile from "../data/shipments.json";

function Shipments() {
  const [shipments, setShipments] = useState(shipmentsFile);

  function Delete(shipment) {
    const index = shipmentsFile.indexOf(shipment);
    shipments.splice(index, 1);
    setShipments(shipments.slice());
  }

  return (
    <div>
      <table>
        <tr>
          <th>Order No</th>
          <th>Date</th>
          <th>Customer</th>
          <th>Tracking No</th>
          <th>Status</th>
          <th>Consignee</th>
          <th></th>
        </tr>
        {shipments.map((shipment) => (
          <tr>
            <td>{shipment.orderNo}</td>
            <td>{shipment.date}</td>
            <td>{shipment.customer}</td>
            <td>{shipment.trackingNo}</td>
            <td>{shipment.status}</td>
            <td>{shipment.consignee}</td>
            <td>
              <Link to={`/shipment/${shipment.orderNo}`}>
                <button> Open</button>
              </Link>
              <button onClick={() => Delete(shipment.orderNo)}> Delete</button>
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
}

export default Shipments;
