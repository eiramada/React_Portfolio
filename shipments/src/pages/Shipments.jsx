import React, { useState } from "react";
import shipmentsFile from "../data/shipments.json";

function Shipments() {
  const [shipments, setShipments] = useState(shipmentsFile);

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
              <button> Open info</button>
              <button> Delete</button>{" "}
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
}

export default Shipments;
