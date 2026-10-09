import { useEffect, useState } from "react";

export default function Dashboard() {
  const [stats, setStats] = useState({
    total_revenue: 0,
    avg_sales: 0,
    rows: 0,
    filename: "No File"
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      const token = localStorage.getItem('token');
      try {
        // Latest uploaded dataset teeskovadam
        const res = await fetch("http://localhost:8000/dataset/list?limit=1", {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();

        if(data.datasets && data.datasets.length > 0) {
          const latest = data.datasets[0];

          // Backend nunchi total_revenue, avg_sales vaste direct ga teeskunta
          // Leka pothe rows matrame kanipistundi
          setStats({
            total_revenue: latest.total_revenue || 0,
            avg_sales: latest.avg_sales || 0,
            rows: latest.rows || data.total_datasets || 0,
            filename: latest.filename || "No File"
          });
        }
      } catch (err) {
        console.log("Stats fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-white">Dashboard</h1>

      {/* 4 Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-6 rounded-xl text-white shadow-lg">
          <p className="text-sm opacity-80">Total Revenue</p>
          <p className="text-3xl font-bold mt-2">₹{stats.total_revenue.toLocaleString('en-IN')}</p>
        </div>

        <div className="bg-gradient-to-r from-pink-500 to-rose-500 p-6 rounded-xl text-white shadow-lg">
          <p className="text-sm opacity-80">Total Rows</p>
          <p className="text-3xl font-bold mt-2">{stats.rows}</p>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-6 rounded-xl text-white shadow-lg">
          <p className="text-sm opacity-80">Avg Sales</p>
          <p className="text-3xl font-bold mt-2">₹{stats.avg_sales.toFixed(2)}</p>
        </div>

        <div className="bg-gradient-to-r from-orange-500 to-amber-500 p-6 rounded-xl text-white shadow-lg">
          <p className="text-sm opacity-80">File</p>
          <p className="text-lg font-bold mt-2 truncate">{stats.filename}</p>
        </div>
      </div>

      {/* Monthly Sales Trend Chart */}
      <div className="bg-gray-800 p-6 rounded-xl mb-6">
        <h2 className="text-xl font-bold mb-4 text-white">Monthly Sales Trend</h2>
        <div className="h-64 flex items-center justify-center text-gray-400">
          {stats.rows > 0? "Chart will show here" : "Upload CSV to see chart"}
        </div>
      </div>

      {/* Sales by Category */}
      <div className="bg-gray-800 p-6 rounded-xl">
        <h2 className="text-xl font-bold mb-4 text-white">Sales by Category</h2>
        <div className="h-64 flex items-center justify-center text-gray-400">
          {stats.rows > 0? "Chart will show here" : "Upload CSV to see chart"}
        </div>
      </div>
    </div>
  );
}