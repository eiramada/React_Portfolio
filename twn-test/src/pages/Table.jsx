import {
  faChevronLeft,
  faChevronRight,
  faSortDown,
  faSortUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../css/table.css";
import listFromFile from "../data/tableInfo.json";

function Table() {
  const [data, setData] = useState([]);
  const apiUrl = "https://midaiganes.irw.ee/api/list?limit=500";
  const [sorting, setSorting] = useState({ key: null, direction: "default" });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [pageNumbers, setPageNumbers] = useState([]);
  const [expandedRow, setExpandedRow] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch(apiUrl);
      const result = await response.json();
      const fetchedData = result.error ? listFromFile : result.list;
      setData(fetchedData);
      calculatePageNumbers(fetchedData);
    } catch (error) {
      setData(listFromFile);
      calculatePageNumbers(listFromFile);
    }
  };

  const calculatePageNumbers = (data) => {
    const totalPages = Math.ceil(data.length / itemsPerPage);
    setPageNumbers(Array.from({ length: totalPages }, (_, i) => i + 1));
  };

  useEffect(() => {
    fetchData();
  }, [apiUrl, itemsPerPage]);

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

  const handleSelectPage = (selectedPage) => {
    if (selectedPage >= 1 && selectedPage <= pageNumbers.length) {
      setCurrentPage(Number(selectedPage));
    }
  };

  const paginatedData = sortedData().slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  function handleRowClick(itemId) {
    setExpandedRow(expandedRow === itemId ? null : itemId);
  }

  return (
    <div>
      <div className="table-wrapper">
      <h1>List</h1>
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
            {paginatedData.map((item) => (
              <React.Fragment key={item.id}>
                <tr
                  role="button"
                  onClick={() => handleRowClick(item.id)}
                  key={item.id}
                >
                  <td>{item.firstname}</td>
                  <td>{item.surname}</td>
                  <td>
                    {item.sex === "m"
                      ? "Male"
                      : item.sex === "f"
                      ? "Female"
                      : ""}
                  </td>
                  <td>
                    {Intl.DateTimeFormat(navigator.language).format(
                      parseBirthDate(item.personal_code)
                    )}
                  </td>
                  <td>{item.phone}</td>
                </tr>
                {expandedRow === item.id && (
                  <tr className="expanded-row">
                    <td colSpan="5">
                      <div className="expanded-row-content">
                        <img
                          src={item.image.small}
                          alt={item.image.alt}
                          title={item.image.title}
                        />
                        <div className="expanded-row-text">
                          <div
                            dangerouslySetInnerHTML={{ __html: item.intro }}
                          />

                          <Link to={`/article/${item.id}`}>
                            <button>Read More</button>
                          </Link>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
      <div className="buttonWrapper">
        <button
          onClick={() => handleSelectPage(currentPage - 1)}
          className={currentPage === 1 ? "disabled" : ""}
          aria-label="Navigate to previous page"
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <ul>
          {pageNumbers.map((pn) => (
            <li key={pn}>
              <button
                onClick={() => {
                  handleSelectPage(pn);
                }}
                className={currentPage === pn ? "active" : ""}
                aria-label={`Navigate to page ${pn}`}
              >
                {pn}
              </button>
            </li>
          ))}
        </ul>
         <button
          onClick={() => handleSelectPage(currentPage + 1)}
          className={currentPage === pageNumbers.length ? "disabled" : ""}
          aria-label="Navigate to next page"
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
    </div>
  );
}

export default Table;
