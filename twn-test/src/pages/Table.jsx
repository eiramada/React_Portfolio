import React, { useEffect, useState } from "react";
import "../css/list.css";
import listFile from "../data/tableInfo.json";

function Table() {
  const [data, setData] = useState([]);
  const apiUrl = "https://midaiganes.irw.ee/api/list?limit=500";

  useEffect(() => {
    fetch(apiUrl)
      .then((result) => {
        return result.json();
      })
      .then((json) => {
        if (json.error) {
          console.log(json.error);
          setData(listFile);
        } else {
          setData(json.list);
        }
      });
  }, [apiUrl]);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>
              <button>First Name</button>
            </th>
            <th>
              <button>Surname</button>
            </th>
            <th>
              <button>Sex</button>
            </th>
            <th>
              <button>Birthday</button>
            </th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.firstname}</td>
              <td>{item.surname}</td>
              <td>{item.sex}</td>
              <td>{item.personal_code}</td>
              <td>{item.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
