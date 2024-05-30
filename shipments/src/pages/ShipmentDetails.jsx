import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import MKBox from "components/MKBox";
import MKButton from "components/MKButton";
import MKInput from "components/MKInput";
import MKTypography from "components/MKTypography";
import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "../css/shipmentDetails.css";
import shipmentsFile from "../data/shipments.json";

function ShipmentDetails() {
  const { index } = useParams();
  const [shipments, setShipments] = useState([]);

  const shipment = index !== -1 ? shipments[index] : null;

  const [isEditing, setIsEditing] = useState(false);
  const [date, setDate] = useState(
    shipment ? new Date(shipment.date) : new Date()
  );

  const orderNoRef = useRef();
  const customerRef = useRef();
  const trackingNoRef = useRef();
  const consigneeRef = useRef();
  const statusRef = useRef();

  const handleEditClick = () => {
    setIsEditing(true);
  };

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
          setShipments(shipmentsFile);
        } else {
          setShipments(json);
        }
        console.log(json);
      });
  }, [url]);

  const handleSaveClick = () => {
    if (!shipment) return;

    shipments[index] = {
      ...shipment,
      orderNo: orderNoRef.current.value,
      date: date.toISOString().substring(0, 10),
      customer: customerRef.current.value,
      trackingNo: trackingNoRef.current.value,
      consignee: consigneeRef.current.value,
      status: statusRef.current.value,
    };
    setIsEditing(false);
  };

  if (!shipment) {
    return (
      <MKBox className="card-container">
        <Link to="/shipments">
          <MKButton className="button" color="primary" variant="outlined">
            Back to Shipments
          </MKButton>
        </Link>
        <MKTypography variant="h4">Shipment not found</MKTypography>
      </MKBox>
    );
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <MKBox className="card-container">
        <Link to="/shipments">
          <MKButton className="button" color="primary" variant="outlined">
            Back to Shipments
          </MKButton>
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
                <MKTypography variant="label">Order No: </MKTypography>
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
                <MKTypography variant="label">Date: </MKTypography>
                {isEditing ? (
                  <DatePicker
                    value={date}
                    onChange={(newDate) => setDate(newDate)}
                    renderInput={(params) => <MKInput {...params} />}
                  />
                ) : (
                  <MKTypography variant="paragraph">
                    {shipment.date}
                  </MKTypography>
                )}
              </MKBox>
            </MKBox>
            <MKBox className="row">
              <MKBox className="col">
                <MKTypography variant="label">Customer: </MKTypography>
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
                <MKTypography variant="label">Tracking No: </MKTypography>
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
                <MKTypography variant="label">Consignee: </MKTypography>
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
                <MKTypography variant="label">Status: </MKTypography>
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
                <MKButton
                  variant="contained"
                  onClick={handleSaveClick}
                  className="button"
                >
                  Save
                </MKButton>
                <Link to="/shipments">
                  <MKButton
                    color="warning"
                    variant="outlined"
                    className="button"
                  >
                    Cancel
                  </MKButton>
                </Link>
              </>
            ) : (
              <MKButton
                variant="contained"
                onClick={handleEditClick}
                className="button"
              >
                Edit
              </MKButton>
            )}
          </MKBox>
        </MKBox>
      </MKBox>
    </LocalizationProvider>
  );
}

export default ShipmentDetails;
