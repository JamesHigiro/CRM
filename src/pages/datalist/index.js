"use client";
import React, { useEffect, useState } from "react";
import { dataListService } from "@/utils/dataListService";
import SideBar from "@/components/nav";
import useSWR from "swr";
import LoadingOrError from "@/components/cacheState";

// Fetcher function for SWR
const fetcher = async () => {
  const data = await dataListService();
  return data;
};

function DataList() {
  // here i meant it will fetch new datas after 10000000 milliseconds which is about 2hr and sth
  const { data: customerData, error } = useSWR("/api/dataList", fetcher, {
    refreshInterval: 10000000,
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [customersPerPage] = useState(5);

  // Filter the data based on search term
  const filteredData = customerData
    ? customerData.filter(
        (customer) =>
          customer.customer_name
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          customer.customer_email
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
      )
    : [];

  // Reset to page 1 when the search term changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // Pagination logic applied after filtering
  const indexOfLastCustomer = currentPage * customersPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
  const currentCustomers = filteredData.slice(
    indexOfFirstCustomer,
    indexOfLastCustomer
  );

  const totalPages = Math.ceil(filteredData.length / customersPerPage);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);


  return (
    <LoadingOrError {...{data:customerData, error}}>
    <div className="flex flex-col md:flex-row h-screen">
      <SideBar />
      <div className="flex-1 flex flex-col p-8 overflow-x-auto">
        <h2 className="text-center text-2xl font-bold mb-8 uppercase text-gray-800">
          Customer Data
        </h2>

        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 mb-5 border border-gray-300 rounded"
        />

        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-3 text-left border-b">Customer ID</th>
              <th className="p-3 text-left border-b">Customer Name</th>
              <th className="p-3 text-left border-b">Email</th>
              <th className="p-3 text-left border-b">Signup Date</th>
              <th className="p-3 text-left border-b">Last Activity</th>
            </tr>
          </thead>
          <tbody>
            {currentCustomers.length > 0 ? (
              currentCustomers.map((data) => (
                <tr key={data.customer_id} className="hover:bg-gray-100">
                  <td className="p-3 border-b">{data.customer_id}</td>
                  <td className="p-3 border-b">{data.customer_name}</td>
                  <td className="p-3 border-b">{data.customer_email}</td>
                  <td className="p-3 border-b">{data.signup_date}</td>
                  <td className="p-3 border-b">{data.last_activity}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-3 text-center border-b">
                  No matching data...
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="flex justify-center mt-5">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => paginate(index + 1)}
              className={`mx-1 px-3 py-2 rounded ${
                currentPage === index + 1
                  ? "bg-green-500 text-white"
                  : "bg-gray-200"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
    </LoadingOrError>
  );
}

export default DataList;
