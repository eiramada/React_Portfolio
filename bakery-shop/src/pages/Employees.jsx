import { useEffect, useRef, useState } from "react";
import { Alert, Button, Table } from "react-bootstrap";
import validator from "validator";

function Employees() {
  const employeesUrl = "https://reqres.in/api/users";
  const [employees, setEmployees] = useState([]);
  const [message, setMessage] = useState();

  const idRef = useRef();
  const nameRef = useRef();
  const emailRef = useRef();
  const avatarRef = useRef();

  useEffect(() => {
    fetch(employeesUrl)
      .then((res) => res.json())
      .then((json) => setEmployees(json.data || []));
  }, []);

  const addEmployee = () => {
    if (!validate()) return;
    addEmployeeToTable();
    resetValues();
  };

  const deleteEmployee = (index) => {
    employees.splice(index, 1);
    setEmployees(employees.slice());
  };

  const validate = () => {
    if (!idRef.current.value || !validator.isNumeric(idRef.current.value)) {
      setMessage("ID is required and has to contain only numbers ");
      return false;
    }
    if (employees.find((p) => p.id === Number(idRef.current.value))) {
      setMessage("Id has to be unique");
      return false;
    }

    if (
      !nameRef.current.value ||
      !validator.isAlpha(nameRef.current.value.replace(" ", ""))
    ) {
      setMessage("Name is required and has to contain only letters");
      return false;
    }

    if (!emailRef.current.value || !validator.isEmail(emailRef.current.value)) {
      setMessage("Email is required and must be valid");
      return false;
    }

    if (!avatarRef.current.value) {
      setMessage("Avatar URL is required");
      return false;
    }

    setMessage("");
    return true;
  };

  const addEmployeeToTable = () => {
    const newEmployee = {
      id: Number(idRef.current.value),
      first_name: nameRef.current.value.split(" ")[0],
      last_name: nameRef.current.value.split(" ")[1] || "",
      email: emailRef.current.value,
      avatar: avatarRef.current.value,
    };
    employees.push(newEmployee);
    setEmployees(employees.slice());
  };

  const resetValues = () => {
    idRef.current.value = "";
    nameRef.current.value = "";
    emailRef.current.value = "";
    avatarRef.current.value = "";
  };

  return (
    <div>
      <div className="container">
        <h2 className="mb-4">Employees</h2>
        {message && <Alert variant="danger">{message}</Alert>}
        <Table className="table table-hover table-bordered table-sortable">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Avatar</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee, index) => (
              <tr key={index}>
                <td>{employee.id}</td>
                <td>
                  {employee.first_name} {employee.last_name}
                </td>
                <td>{employee.email}</td>
                <td>
                  <img src={employee.avatar} alt="" />
                </td>
                <td>
                  <Button
                    onClick={() => deleteEmployee(index)}
                    variant="danger"
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
            <tr className="input-row">
              <td>
                <input
                  type="number"
                  placeholder="ID"
                  className="form-control"
                  ref={idRef}
                />
              </td>
              <td>
                <input
                  type="text"
                  placeholder="Name"
                  className="form-control"
                  ref={nameRef}
                />
              </td>
              <td>
                <input
                  type="email"
                  placeholder="Email"
                  className="form-control"
                  ref={emailRef}
                />
              </td>
              <td>
                <input
                  type="text"
                  placeholder="Avatar URL"
                  className="form-control"
                  ref={avatarRef}
                />
              </td>
              <td>
                <Button onClick={addEmployee} type="submit" variant="success">
                  Add
                </Button>
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default Employees;
