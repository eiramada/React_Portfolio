import MKBox from "components/MKBox";
import MKButton from "components/MKButton";
import MKTypography from "components/MKTypography";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../css/shipments.css";
import shipmentsFile from "../data/shipments.json";

function Shipments() {
  const [shipments, setShipments] = useState([]);
  const [dbShipments, setDbShipments] = useState([]);

  const url = "https://my.api.mockaroo.com/shipments.json?key=5e0b62d0";

  useEffect(() => {
    fetch(url)
      .then((result) => {
        if (!result.ok) {
          throw new Error("Network response was not ok");
        }
        return result.json();
      })
      .then((json) => {
        if (json.error) {
          throw new Error(json.error);
        }
        setShipments(json);
      })
      .catch(() => {
        setDbShipments(shipmentsFile);
        setShipments(shipmentsFile);
      });
  }, [url]);

  function deleteShipment(shipment) {
    const index = dbShipments.indexOf(shipment);
    shipments.splice(index, 1);
    setShipments(shipments.slice());
  }

  return (
    <MKBox className="container">
      <MKTypography variant="h2" className="heading-2">
        Shipments
      </MKTypography>
      <div className="table-container">
        <table className="shipment-table">
          <thead>
            <tr>
              <th>Order No</th>
              <th>Date</th>
              <th>Customer</th>
              <th>Tracking No</th>
              <th>Status</th>
              <th>Consignee</th>
              <th>Action</th>
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
                    <MKButton
                      color="primary"
                      variant="outlined"
                      className="button"
                    >
                      Open
                    </MKButton>
                  </Link>
                  <MKButton
                    variant="contained"
                    color="warning"
                    onClick={() => deleteShipment(shipment)}
                    className="button"
                  >
                    Delete
                  </MKButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </MKBox>
  );
}

export default Shipments;
