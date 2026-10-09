import { useState } from "react";

export default function UploadDataset() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setMessage("");

    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        const csv = evt.target.result;
        const rows = csv.split("\n").slice(0, 6);
        const allData = rows.map(row => row.split(","));

        const headers = allData[0];

        // Nuvvu adigina 5 columns matrame
        const neededCols = ["Data", "sales", "category", "product", "region"];
        const colIndexes = neededCols.map(col => headers.indexOf(col));

        // 5 columns data matrame filter chesa
        const filteredData = allData.map(row =>
          colIndexes.map(idx => row[idx] || "")
        );

        setPreview(filteredData);
      };
      reader.readAsText(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("❌ Please select a CSV file first");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    const token = localStorage.getItem('token');

    try {
      const res = await fetch("http://localhost:8000/dataset/upload", {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData,
      });

      const data = await res.json();
      setMessage(res.ok? "✅ " + data.message : "❌ " + data.detail);
    } catch (err) {
      setMessage("❌ Server Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Upload Dataset</h1>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <input
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          className="mb-4"
        />

        <button
          onClick={handleUpload}
          disabled={loading ||!file}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold"
        >
          {loading? "Uploading..." : "Upload Dataset"}
        </button>

        {message && <div className="mt-4 p-3 bg-gray-100">{message}</div>}
      </div>

      {preview.length > 0 && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">Preview - 5 Columns Only</h2>
          <table className="min-w-full border">
            <thead>
              <tr className="bg-gray-200 font-bold">
                <th className="border px-4 py-2">Data</th>
                <th className="border px-4 py-2">sales</th>
                <th className="border px-4 py-2">category</th>
                <th className="border px-4 py-2">product</th>
                <th className="border px-4 py-2">region</th>
              </tr>
            </thead>
            <tbody>
              {preview.slice(1).map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => (
                    <td key={j} className="border px-4 py-2 text-sm">{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}