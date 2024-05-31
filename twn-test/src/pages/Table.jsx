import { faSortDown, faSortUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import "../css/table.css";
import listFromFile from "../data/tableInfo.json";

function Table() {
  const [data, setData] = useState([]);
  const apiUrl = "https://midaiganes.irw.ee/api/list?limit=500";
  const [sorting, setSorting] = useState({ key: null, direction: "default" });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    fetch(apiUrl)
      .then((result) => result.json())
      .then((json) => setData(json.error ? listFromFile : json.list))
      .catch(() => setData(listFromFile));
  }, [apiUrl]);

  const parseBirthDate = (personal_code) => {
    const codeStr = personal_code.toString();
    const century = Math.floor((parseInt(codeStr[0], 10) + 1) / 2) * 100 + 1700;
    const year = century + parseInt(codeStr.substring(1, 3), 10);
    const month = parseInt(codeStr.substring(3, 5), 10) - 1;
    const day = parseInt(codeStr.substring(5, 7), 10);

    return new Date(year, month, day);
  };

  const sort = (key) => {
    let direction = "asc";
    if (sorting.key === key) {
      if (sorting.direction === "asc") {
        direction = "desc";
      } else if (sorting.direction === "desc") {
        direction = "default";
      }
    }
    setSorting({ key, direction });
  };

  const sortedData = () => {
    if (sorting.key === null || sorting.direction === "default") {
      return data;
    }

    return [...data].sort((a, b) => {
      let aValue = a[sorting.key];
      let bValue = b[sorting.key];

      if (sorting.key === "personal_code") {
        aValue = parseBirthDate(aValue);
        bValue = parseBirthDate(bValue);
      }

      if (aValue < bValue) {
        return sorting.direction === "asc" ? -1 : 1;
      }
      if (aValue > bValue) {
        return sorting.direction === "asc" ? 1 : -1;
      }
      return 0;
    });
  };

  const renderSortIcons = (key) => (
    <>
      <FontAwesomeIcon
        icon={faSortUp}
        className={`sort-icon ${
          sorting.key === key && sorting.direction === "asc" ? "active" : ""
        }`}
      />
      <FontAwesomeIcon
        icon={faSortDown}
        className={`sort-icon ${
          sorting.key === key && sorting.direction === "desc" ? "active" : ""
        }`}
      />
    </>
  );

  const handleSelectPage = (event) => {
    setCurrentPage(Number(event.target.id));
  };

  function renderPageNumbers() {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(data.length / itemsPerPage); i++) {
      pageNumbers.push(i);
    }
    return pageNumbers.map((number) => (
      <li
        key={number}
        id={number}
        onClick={handleSelectPage}
        className={currentPage === number ? "active" : ""}
      >
        {number}
      </li>
    ));
  }

  const currentData = sortedData().slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>
              <button onClick={() => sort("firstname")}>
                First Name{renderSortIcons("firstname")}
              </button>
            </th>
            <th>
              <button onClick={() => sort("surname")}>
                Surname {renderSortIcons("surname")}
              </button>
            </th>
            <th>
              <button onClick={() => sort("sex")}>
                Sex {renderSortIcons("sex")}
              </button>
            </th>
            <th>
              <button onClick={() => sort("personal_code")}>
                Date of Birth {renderSortIcons("personal_code")}
              </button>
            </th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((item) => (
            <tr key={item.id}>
              <td>{item.firstname}</td>
              <td>{item.surname}</td>
              <td>
                {item.sex === "m" ? "Male" : item.sex === "f" ? "Female" : ""}
              </td>
              <td>
                {Intl.DateTimeFormat(navigator.language).format(
                  parseBirthDate(item.personal_code)
                )}
              </td>

              <td>{item.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <ul id="page-numbers">{renderPageNumbers()}</ul>
    </div>
  );
}

export default Table;
