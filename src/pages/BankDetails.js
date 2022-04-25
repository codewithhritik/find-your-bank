import React from "react";
import { useLocation } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Link } from "react-router-dom";

function BankDetails() {
  const data = useLocation();
  return (
    <>
      {/* Back Button to '/all-banks' */}
      <Link to="/all-banks">
        <button className="flex m-4 p-2 rounded-lg text-sm font-semibold tracking-wide border-2 hover:bg-green-50 transition-colors duration-200 outline-none">
          <AiOutlineArrowLeft className="mt-1 mr-1" /> Back
        </button>
      </Link>
      <div className="flex justify-center">
        <h1 className="uppercase flex text-center text-gray-800 font-bold sm:text-3xl text-2xl py-5 tracking-wide">
          Bank Details
        </h1>
      </div>
      {/* Bank Details Table */}
      <div className="flex justify-center px-6">
        <table className="border-2 shadow-md border-collapse overflow-hidden rounded-lg text-sm sm:text-base">
          <tr className="p-2">
            <td className="px-5 py-2 font-semibold border-b-2 tracking-wide text-left">
              Bank ID
            </td>
            <td className="px-4 text-gray-700 py-2 border-b-2">
              {data.state.bank_id}
            </td>
          </tr>
          <tr>
            <td className="px-5 py-2 border-b-2 font-semibold tracking-wide text-left">
              Bank Name
            </td>
            <td className="px-4 text-gray-700 py-2 border-b-2">
              {data.state.bank_name}
            </td>
          </tr>
          <tr>
            <td className="px-5 py-2 border-b-2 font-semibold tracking-wide text-left">
              Branch
            </td>
            <td className="px-4 text-gray-700 py-2 border-b-2">
              {data.state.branch}
            </td>
          </tr>
          <tr>
            <td className="px-5 py-2 border-b-2 font-semibold tracking-wide text-left">
              State
            </td>
            <td className="px-4 text-gray-700 py-2 border-b-2">
              {data.state.state}
            </td>
          </tr>
          <tr>
            <td className="px-5 py-2 border-b-2 font-semibold tracking-wide text-left">
              District
            </td>
            <td className="px-4 text-gray-700 py-2 border-b-2">
              {data.state.district}
            </td>
          </tr>
          <tr>
            <td className="px-5 py-2 border-b-2 font-semibold tracking-wide text-left">
              City
            </td>
            <td className="px-4 text-gray-700 py-2 border-b-2">
              {data.state.city}
            </td>
          </tr>
          <tr>
            <td className="px-5 py-2 border-b-2 font-semibold tracking-wide text-left">
              Address
            </td>
            <td className="px-4 text-gray-700 py-2 border-b-2">
              {data.state.address}
            </td>
          </tr>
          <tr>
            <td className="px-5 py-2 border-b-2 font-semibold tracking-wide text-left">
              IFSC Code
            </td>
            <td className="px-4 text-gray-700 py-2 border-b-2">
              {data.state.ifsc}
            </td>
          </tr>
        </table>
      </div>
    </>
  );
}

export default BankDetails;
