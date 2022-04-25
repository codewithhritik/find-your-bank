import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { useTable, usePagination, useFilters } from "react-table";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { useHistory } from "react-router-dom";

function Banks() {
  const [banks, setBanks] = useState([]);
  const [cityDropdown, setCityDropdown] = useState("Mumbai");
  const [categoryDropdown, setCategoryDropdown] = useState("bank_name");
  const [refreshTable, setRefreshTable] = useState(0);
  const [loading, setLoading] = useState(true);

  const history = useHistory();

  // Fetch Data
  const fetchBanks = async () => {
    let cancelToken;

    if (typeof cancelToken != typeof undefined) {
      cancelToken.cancel("Cancelling prev req");
    }

    cancelToken = axios.CancelToken.source();

    setLoading(true);
    const response = await axios
      .get(
        `https://vast-shore-74260.herokuapp.com/banks?city=${cityDropdown.toUpperCase()}`,
        { cancelToken: cancelToken.token }
      )
      .catch((err) => console.log(err));

    if (response) {
      const banks = response.data;
      setBanks(banks);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanks();
  }, [refreshTable]);

  const columns = useMemo(
    () => [
      {
        Header: "Bank",
        accessor: "bank_name",
      },
      {
        Header: "IFSC",
        accessor: "ifsc",
      },
      {
        Header: "Branch",
        accessor: "branch",
      },
      {
        Header: "Bank ID",
        accessor: "bank_id",
      },
      {
        Header: "Address",
        accessor: "address",
      },
    ],
    []
  );

  const data = useMemo(() => banks, [banks]);

  const tableInstance = useTable({ columns, data }, useFilters, usePagination);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state,
    setPageSize,
    prepareRow,
    setFilter,
  } = tableInstance;

  const { pageIndex, pageSize } = state;

  function handleCityDropdownChange(event) {
    setCityDropdown(event.target.value);
    setRefreshTable((oldKey) => oldKey + 1);
  }

  function handleTableRowClick(row) {
    history.push({
      pathname: `/bank-details/${row.original.ifsc}`,
      state: row.original,
    });
  }

  return (
    <div className="sm:container px-6 sm:px-14 mx-auto">
      <div className="flex flex-wrap justify-evenly">
        {/* City Filter */}
        <select
          className="mt-10 py-1.5 px-2 tracking-wider border-2 outline-none rounded-lg focus:border-green-200"
          value={cityDropdown}
          onChange={handleCityDropdownChange}
        >
          <option>Mumbai</option>
          <option>Delhi</option>
          <option>Pune</option>
          <option>Bangalore</option>
          <option>Sangli</option>
        </select>

        {/* Category Filter */}
        <select
          className="mt-10 py-1.5 px-2 tracking-wider border-2 outline-none rounded-lg focus:border-green-200"
          value={categoryDropdown}
          onChange={(e) => {
            const selectedCategory = e.target.value;
            setCategoryDropdown(selectedCategory);
          }}
        >
          <option value="ifsc">IFSC</option>
          <option value="branch">Branch</option>
          <option value="bank_name">Bank Name</option>
        </select>

        {/* Search Bar */}
        <input
          type="search"
          className="mt-10 py-1.5 px-2 tracking-wider border-2 outline-none text-base font-normal text-gray-700 bg-white bg-clip-padding border-solid border-gray-300 transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-green-200 focus:outline-none rounded-lg"
          placeholder="Search"
          aria-label="Search"
          onChange={(e) => setFilter(`${categoryDropdown}`, e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="flex justify-center py-10">
        <table
          className="table-fixed border-collapse w-full sm:w-[98%] border shadow-md overflow-hidden rounded-lg"
          {...getTableProps}
        >
          <thead className="bg-green-100 border-b-2 border-gray-100">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    className="p-3 text-sm font-semibold tracking-wide text-left"
                    {...column.getHeaderProps()}
                  >
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()} className="divide-y divide-gray-200">
            {page.length > 0 && !loading ? (
              page.map((row, i) => {
                prepareRow(row);
                return (
                  <tr
                    {...row.getRowProps()}
                    onClick={() => handleTableRowClick(row)}
                    className="hover:bg-green-50 transition-colors duration-200 break-words"
                  >
                    {row.cells.map((cell) => (
                      <td
                        className="p-3 text-xs sm:text-sm text-gray-700 cursor-pointer"
                        {...cell.getCellProps()}
                      >
                        {cell.render("Cell")}
                      </td>
                    ))}
                  </tr>
                );
              })
            ) : loading ? (
              <div className="font-semibold px-2 py-2">Loading...</div>
            ) : (
              <div className="font-semibold px-2 py-2">No entries found!</div>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between pb-10">
        {/* Page Number */}
        <span className="mt-2">
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>
        {/* Page moving arrows */}
        <div className="flex gap-x-2 sm:gap-x-8">
          <button
            className="py-2 px-3 uppercase text-xs rounded-lg font-bold tracking-wider border-2 hover:bg-green-50 transition-colors duration-200"
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
          >
            <AiOutlineArrowLeft />
          </button>
          <button
            className="py-2 px-3 uppercase text-xs rounded-lg font-bold tracking-wider border-2 hover:bg-green-50 transition-colors duration-200"
            onClick={() => nextPage()}
            disabled={!canNextPage}
          >
            <AiOutlineArrowRight />
          </button>
        </div>
        {/* Row Size Dropdown */}
        <select
          className="py-1.5 px-2 rounded-lg tracking-wider border-2 outline-none"
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
        >
          {[10, 25, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default Banks;
