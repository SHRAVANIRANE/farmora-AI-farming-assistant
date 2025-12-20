import { useEffect, useState } from "react";

export default function FarmSummary() {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/crop-health/summary")
      .then((res) => res.json())
      .then((data) => {
        setSummary(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Farm summary error:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="bg-green-600 text-white p-6 rounded-xl shadow-md">
        Loading farm health summary...
      </div>
    );
  }

  if (!summary) return null;

  return (
    <div className="bg-green-600 text-white p-6 rounded-xl shadow-md">
      <h3 className="font-semibold">Overall Farm Health</h3>

      <p className="text-4xl font-bold mt-1">{summary.healthy_percentage}%</p>

      <p className="text-sm mt-2">
        {summary.total_fields} scans • Last updated: just now
      </p>

      <div className="flex gap-6 mt-4">
        <div>
          <p className="text-sm">Healthy</p>
          <p className="font-bold text-lg">
            {summary.total_fields - summary.diseased_fields}
          </p>
        </div>

        <div>
          <p className="text-sm">Need Attention</p>
          <p className="font-bold text-lg">{summary.diseased_fields}</p>
        </div>
      </div>
    </div>
  );
}
