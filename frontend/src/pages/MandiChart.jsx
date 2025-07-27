import React, { useEffect, useState } from "react";

const BACKEND_API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/prices`;

export default function MandiChart() {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stateName, setStateName] = useState("");
  const [message, setMessage] = useState("");

  // ✅ Fetch ALL data on page load
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        const res = await fetch(BACKEND_API_URL); // Using fetch instead of axios
        
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        
        const data = await res.json();
        const records = data.records || [];
        const cleanedData = records.map((record) => ({
          name: record.commodity || "N/A",
          price: formatPrice(record.modal_price),
          unit: "₹/quintal",
          market: record.market || "N/A",
          state: record.state || "N/A",
          date: record.arrival_date || "N/A",
        }));
        setTableData(cleanedData);
      } catch (err) {
        console.error("Error fetching initial data", err);
        setMessage("Failed to load mandi data");
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  // Helper function to safely format price (per 100kg/quintal)
  const formatPrice = (modalPrice) => {
    if (!modalPrice || isNaN(modalPrice)) return "0.00";
    const numPrice = parseInt(modalPrice, 10);
    return isNaN(numPrice) ? "0.00" : numPrice.toFixed(2);
  };

  // ✅ Handle Search for specific state
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!stateName.trim()) {
      setMessage("Please enter a state name");
      return;
    }

    try {
      setLoading(true);
      setMessage("");
      
      const url = new URL(BACKEND_API_URL);
      url.searchParams.append('state', stateName);
      
      const res = await fetch(url);
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      const records = data.records || [];
      
      if (records.length === 0) {
        setMessage(data.message || "No data found for this state");
        setTableData([]);
      } else {
        const cleanedData = records.map((record) => ({
          name: record.commodity || "N/A",
          price: formatPrice(record.modal_price),
          unit: "₹/quintal",
          market: record.market || "N/A",
          state: record.state || "N/A",
          date: record.arrival_date || "N/A",
        }));
        setTableData(cleanedData);
      }
    } catch (err) {
      console.error("Error fetching data", err);
      setMessage("Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-green-700">
        🌾 Mandi Price Dashboard
      </h2>

      {/* Search Bar */}
      <div className="mb-6 flex flex-col sm:flex-row items-center justify-center gap-3">
        <input
          type="text"
          placeholder="Enter State (e.g., Uttarakhand)"
          value={stateName}
          onChange={(e) => setStateName(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch(e)}
          className="border border-gray-300 p-3 rounded-lg w-80 shadow focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <button
          onClick={handleSearch}
          disabled={loading}
          className="bg-green-600 text-white px-6 py-3 rounded-lg shadow hover:bg-green-700 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      {/* Loading State */}
      {loading && (
        <p className="text-center text-gray-500 text-lg animate-pulse">
          Fetching mandi prices...
        </p>
      )}

      {/* Message */}
      {!loading && message && (
        <p className="text-center text-red-500 text-lg font-semibold">
          {message}
        </p>
      )}

      {/* Data Table */}
      {!loading && tableData.length > 0 && (
        <div className="overflow-x-auto rounded-lg shadow-md border border-gray-200">
          <table className="min-w-full text-sm text-left text-gray-700">
            <thead className="bg-green-100 text-green-800 uppercase text-xs font-semibold">
              <tr>
                <th className="p-3">Commodity</th>
                <th className="p-3">Price</th>
                <th className="p-3">Unit</th>
                <th className="p-3">Market</th>
                <th className="p-3">State</th>
                <th className="p-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((item, idx) => (
                <tr
                  key={idx}
                  className="hover:bg-green-50 transition duration-200"
                >
                  <td className="p-3 border-b">{item.name}</td>
                  <td className="p-3 border-b font-semibold text-green-700">
                    ₹ {item.price}
                  </td>
                  <td className="p-3 border-b">{item.unit}</td>
                  <td className="p-3 border-b">{item.market}</td>
                  <td className="p-3 border-b">{item.state}</td>
                  <td className="p-3 border-b">{item.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}