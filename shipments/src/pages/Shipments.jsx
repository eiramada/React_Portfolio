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

  //Every request gets new set of data.
  // const url = "https://my.api.mockaroo.com/shipments.json?key=5e0b62d0";
  const url = "https://my.api.mockaroo.com/shipments.json";

  useEffect(() => {
    fetch(url)
      .then((result) => {
        return result.json();
      })
      .then((json) => {
        if (json.error) {
          console.log(json.error);
          setDbShipments(shipmentsFile);
          setShipments(shipmentsFile);
        } else {
          setShipments(json);
        }
      });
  }, [url]);

  function deleteShipment(index) {
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
            {shipments.map((shipment, index) => (
              <tr key={shipment.orderNo}>
                <td>{shipment.orderNo}</td>
                <td>{shipment.date}</td>
                <td>{shipment.customer}</td>
                <td>{shipment.trackingNo}</td>
                <td>{shipment.status}</td>
                <td>{shipment.consignee}</td>
                <td>
                  <Link to={`/shipment/${index}`}>
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
                    onClick={() => deleteShipment(index)}
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
