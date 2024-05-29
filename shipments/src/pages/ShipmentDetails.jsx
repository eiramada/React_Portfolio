import React, { useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import shipmentsFile from "../data/shipments.json";

function ShipmentDetails() {
  const { orderNo } = useParams();
  const shipmentIndex = shipmentsFile.findIndex((s) => s.orderNo === orderNo);
  const shipment = shipmentsFile[shipmentIndex];

  const [isEditing, setIsEditing] = useState(false);

  const orderNoRef = useRef();
  const dateRef = useRef();
  const customerRef = useRef();
  const trackingNoRef = useRef();
  const consigneeRef = useRef();
  const statusRef = useRef();

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    shipmentsFile[shipmentIndex] = {
      ...shipment,
      orderNo: orderNoRef.current.value,
      date: dateRef.current.value,
      customer: customerRef.current.value,
      trackingNo: trackingNoRef.current.value,
      consignee: consigneeRef.current.value,
      status: statusRef.current.value,
    };
    setIsEditing(false);
  };

  return (
    <div>
      <Link to="/shipments">
        <button>Back to Shipments</button>
      </Link>
      <div className="shipment-details">
        <h2>Shipment Details</h2>
        <div className="shipment-info">
          <div className="shipment-row">
            <div className="shipment-column">
              <label>orderNo</label>
              {isEditing ? (
                <input
                  type="text"
                  name="orderNo"
                  defaultValue={shipment.orderNo}
                  ref={orderNoRef}
                />
              ) : (
                <div className="shipment-data">{shipment.orderNo}</div>
              )}
            </div>
            <div className="shipment-column">
              <label>date</label>
              {isEditing ? (
                <input
                  type="text"
                  name="date"
                  defaultValue={shipment.date}
                  ref={dateRef}
                />
              ) : (
                <div className="shipment-data">{shipment.date}</div>
              )}
            </div>
          </div>
          <div className="shipment-row">
            <div className="shipment-column">
              <label>customer</label>
              {isEditing ? (
                <input
                  type="text"
                  name="customer"
                  defaultValue={shipment.customer}
                  ref={customerRef}
                />
              ) : (
                <div className="shipment-data">{shipment.customer}</div>
              )}
            </div>
            <div className="shipment-column">
              <label>trackingNo</label>
              {isEditing ? (
                <input
                  type="text"
                  name="trackingNo"
                  defaultValue={shipment.trackingNo}
                  ref={trackingNoRef}
                />
              ) : (
                <div className="shipment-data">{shipment.trackingNo}</div>
              )}
            </div>
          </div>
          <div className="shipment-row">
            <div className="shipment-column">
              <label>consignee</label>
              {isEditing ? (
                <input
                  type="text"
                  name="consignee"
                  defaultValue={shipment.consignee}
                  ref={consigneeRef}
                />
              ) : (
                <div className="shipment-data">{shipment.consignee}</div>
              )}
            </div>
            <div className="shipment-column">
              <label>status</label>
              {isEditing ? (
                <input
                  type="text"
                  name="status"
                  defaultValue={shipment.status}
                  ref={statusRef}
                />
              ) : (
                <div className="shipment-data">{shipment.status}</div>
              )}
            </div>
          </div>
        </div>
        {isEditing ? (
          <>
            <button onClick={handleSaveClick}>Save</button>
            <Link to="/shipments">
              <button>Cancel</button>
            </Link>
          </>
        ) : (
          <button onClick={handleEditClick}>Edit</button>
        )}
      </div>
    </div>
  );
}

export default ShipmentDetails;
