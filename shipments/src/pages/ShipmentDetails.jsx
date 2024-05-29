import MKBox from "components/MKBox";
import MKButton from "components/MKButton";
import MKInput from "components/MKInput";
import MKTypography from "components/MKTypography";
import { useRef, useState } from "react";
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
    <MKBox className="container">
      <Link to="/shipments">
        <MKButton variant="outlined">Back to Shipments</MKButton>
      </Link>
      <MKBox className="card">
        <MKBox className="card-header">
          <MKTypography variant="h4" className="card-title">
            Shipment Details
          </MKTypography>
        </MKBox>
        <MKBox className="card-body">
          <MKBox className="row">
            <MKBox className="col">
              <MKTypography variant="label">Order No</MKTypography>
              {isEditing ? (
                <MKInput
                  type="text"
                  defaultValue={shipment.orderNo}
                  inputRef={orderNoRef}
                />
              ) : (
                <MKTypography variant="paragraph">
                  {shipment.orderNo}
                </MKTypography>
              )}
            </MKBox>
            <MKBox className="col">
              <MKTypography variant="label">Date</MKTypography>
              {isEditing ? (
                <MKInput
                  type="text"
                  defaultValue={shipment.date}
                  inputRef={dateRef}
                />
              ) : (
                <MKTypography variant="paragraph">{shipment.date}</MKTypography>
              )}
            </MKBox>
          </MKBox>
          <MKBox className="row">
            <MKBox className="col">
              <MKTypography variant="label">Customer</MKTypography>
              {isEditing ? (
                <MKInput
                  type="text"
                  defaultValue={shipment.customer}
                  inputRef={customerRef}
                />
              ) : (
                <MKTypography variant="paragraph">
                  {shipment.customer}
                </MKTypography>
              )}
            </MKBox>
            <MKBox className="col">
              <MKTypography variant="label">Tracking No</MKTypography>
              {isEditing ? (
                <MKInput
                  type="text"
                  defaultValue={shipment.trackingNo}
                  inputRef={trackingNoRef}
                />
              ) : (
                <MKTypography variant="paragraph">
                  {shipment.trackingNo}
                </MKTypography>
              )}
            </MKBox>
          </MKBox>
          <MKBox className="row">
            <MKBox className="col">
              <MKTypography variant="label">Consignee</MKTypography>
              {isEditing ? (
                <MKInput
                  type="text"
                  defaultValue={shipment.consignee}
                  inputRef={consigneeRef}
                />
              ) : (
                <MKTypography variant="paragraph">
                  {shipment.consignee}
                </MKTypography>
              )}
            </MKBox>
            <MKBox className="col">
              <MKTypography variant="label">Status</MKTypography>
              {isEditing ? (
                <MKInput
                  type="text"
                  defaultValue={shipment.status}
                  inputRef={statusRef}
                />
              ) : (
                <MKTypography variant="paragraph">
                  {shipment.status}
                </MKTypography>
              )}
            </MKBox>
          </MKBox>
        </MKBox>
        <MKBox className="card-footer">
          {isEditing ? (
            <>
              <MKButton variant="contained" onClick={handleSaveClick}>
                Save
              </MKButton>
              <Link to="/shipments">
                <MKButton variant="outlined">Cancel</MKButton>
              </Link>
            </>
          ) : (
            <MKButton variant="contained" onClick={handleEditClick}>
              Edit
            </MKButton>
          )}
        </MKBox>
      </MKBox>
    </MKBox>
  );
}

export default ShipmentDetails;
