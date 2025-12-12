import React from "react";

export default function UploadSection({
  selectedFile,
  setSelectedFile,
  onPredict,
  loading,
}) {
  const handleFileChange = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    setSelectedFile(f);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md h-full">
      <h2 className="text-lg font-semibold text-green-700 mb-4">
        Upload Crop Image
      </h2>

      <label className="border-2 border-dashed border-green-400 rounded-xl flex flex-col items-center justify-center h-[300px] cursor-pointer hover:bg-green-50 transition">
        {!selectedFile ? (
          <>
            <span className="text-4xl text-green-500">📷</span>
            <p className="mt-2 text-gray-600">Click to upload crop image</p>
            <p className="text-sm text-gray-500">PNG, JPG up to 10MB</p>
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <p className="text-center">{selectedFile.name}</p>
          </div>
        )}

        <input
          type="file"
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
        />
      </label>

      <button
        onClick={onPredict}
        disabled={loading || !selectedFile}
        className="mt-4 w-full bg-green-600 text-white py-2 rounded-lg disabled:opacity-50"
      >
        {loading ? "Analyzing..." : "Run Diagnosis"}
      </button>
    </div>
  );
}
