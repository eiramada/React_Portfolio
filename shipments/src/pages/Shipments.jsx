import MKBox from "components/MKBox";
import MKButton from "components/MKButton";
import { useState } from "react";
import { Link } from "react-router-dom";
import shipmentsFile from "../data/shipments.json";

function Shipments() {
  const [shipments, setShipments] = useState(shipmentsFile);

  function deleteShipment(orderNo) {
    const updatedShipments = shipments.filter(
      (shipment) => shipment.orderNo !== orderNo
    );
    setShipments(updatedShipments);
  }

  return (
    <MKBox className="container">
      <table className="table">
        <thead>
          <tr>
            <th>Order No</th>
            <th>Date</th>
            <th>Customer</th>
            <th>Tracking No</th>
            <th>Status</th>
            <th>Consignee</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {shipments.map((shipment) => (
            <tr key={shipment.orderNo}>
              <td>{shipment.orderNo}</td>
              <td>{shipment.date}</td>
              <td>{shipment.customer}</td>
              <td>{shipment.trackingNo}</td>
              <td>{shipment.status}</td>
              <td>{shipment.consignee}</td>
              <td>
                <Link to={`/shipment/${shipment.orderNo}`}>
                  <MKButton variant="outlined">Open</MKButton>
                </Link>
                <MKButton
                  variant="contained"
                  onClick={() => deleteShipment(shipment.orderNo)}
                >
                  Delete
                </MKButton>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </MKBox>
  );
}

export default Shipments;
