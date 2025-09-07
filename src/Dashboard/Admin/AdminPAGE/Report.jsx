import React from 'react';
import useUser from '../../../Hook/useUser';
import useAddItem from '../../../Hook/useAddItem';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer } from 'recharts';

export default function Report() {
  const { userData } = useUser();
  const { addItem } = useAddItem();

  // Transform addItem data for chart
  const chartData = addItem.map(item => ({
    name: item.productName,
    price: parseFloat(item.price),
    offerPrice: parseFloat(item.offerPrice),
  }));

  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center sm:text-left">
        Report Dashboard
      </h1>

      {/* Chart */}
      <div className="bg-white shadow-md rounded-lg p-4 sm:p-6">
        <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-700 text-center sm:text-left">
          Price vs Offer Price
        </h2>
        <div className="w-full h-80 sm:h-96">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis  />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="price" fill="#4f46e5" />
              <Bar  dataKey="offerPrice" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
