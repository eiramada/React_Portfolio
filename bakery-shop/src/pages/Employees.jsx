import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";

function Employees() {
  const employeesUrl = "https://reqres.in/api/users";
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetch(employeesUrl)
      .then((res) => res.json())
      .then((json) => setEmployees(json.data || []));
  }, []);

  const addEmployee = () => {
    // TODO: Add validations
    // TODO: Add an employee to the table
  };

  const deleteEmployee = (index) => {
    // TODO: Delete an employee from the table
  };

  return (
    <div>
      <div className="container">
        <h2 className="mb-4">Employees</h2>
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
            {employees.map((employee) => (
              <tr>
                <td>{employee.id}</td>
                <td>
                  {employee.first_name} {employee.last_name}
                </td>
                <td>{employee.email}</td>
                <td>
                  <img src={employee.avatar} alt="" />
                </td>
                <td>
                  <Button type="button" variant="danger">
                    Delete
                  </Button>
                </td>
              </tr>
            ))}

            <tr className="input-row">
              <td>
                <input type="text" placeholder="ID" className="form-control" />
              </td>
              <td>
                <input
                  type="text"
                  placeholder="Name"
                  className="form-control"
                />
              </td>
              <td>
                <input
                  type="text"
                  placeholder="Email"
                  className="form-control"
                />
              </td>
              <td>
                <Button type="submit" variant="success">
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
