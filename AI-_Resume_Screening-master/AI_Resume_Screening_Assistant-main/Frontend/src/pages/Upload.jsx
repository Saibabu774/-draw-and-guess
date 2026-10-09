import { useState } from "react";

export default function Upload() {
  const [file, setFile] = useState(null);

  const handleUpload = () => {
    if(!file) {
      alert("First file select chey bro");
      return;
    }
    alert("File selected: " + file.name);
    // ikkada backend ki API call chestham tarvata
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Upload Resume</h1>

      <div className="bg-white p-6 rounded-lg shadow-md max-w-lg">
        <label className="block mb-2 font-semibold">Resume File.pdf.docx</label>
        <input
          type="file"
          accept=".pdf,.docx"
          onChange={(e) => setFile(e.target.files[0])}
          className="block w-full border rounded p-2"
        />

        <button
          onClick={handleUpload}
          className="mt-4 bg-fuchsia-600 text-white px-6 py-2 rounded-lg hover:bg-fuchsia-700"
        >
          Upload
        </button>
      </div>
    </div>
  )
}
export default function Upload() {
  return <h1>Upload Page Working</h1>
}