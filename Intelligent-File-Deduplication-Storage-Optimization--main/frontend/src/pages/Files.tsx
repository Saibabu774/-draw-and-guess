import { useEffect, useState } from "react";

export default function Files() {
  const [files, setFiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const fetchFiles = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:8000/api/v1/files", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setFiles(data.files || data || []);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const handleUpload = async (e: any) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    try {
      setUploading(true);
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:8000/api/v1/files/upload", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      if (!res.ok) throw new Error("upload failed");
      await fetchFiles();
      alert("Uploaded!");
    } catch (err: any) {
      alert("Upload failed: " + err.message);
    } finally {
      setUploading(false);
    }
  };

  if (loading) return <div style={{ padding: 20 }}>Loading files...</div>;

  return (
    <div style={{ padding: 20 }}>
      <h2>Files</h2>
      <div style={{ margin: "20px 0" }}>
        <input type="file" onChange={handleUpload} disabled={uploading} />
        {uploading && <span> Uploading...</span>}
      </div>
      {files.length === 0 && <p>No files yet. Upload one!</p>}
      {files.length > 0 && (
        <table border={1} cellPadding={8} style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Size</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {files.map((f: any, i: number) => (
              <tr key={i}>
                <td>{f.filename || f.name || f.original_name || "file"}</td>
                <td>{f.size ? (f.size / 1024).toFixed(2) + " KB" : "-"}</td>
                <td>{f.status || "active"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}