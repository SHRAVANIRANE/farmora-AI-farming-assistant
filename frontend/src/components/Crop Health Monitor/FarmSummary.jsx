export default function FarmSummary({ scanned }) {
  const total = scanned.length;
  const infected = scanned.filter(
    (s) => !s.prediction.toLowerCase().includes("healthy")
  ).length;
  const healthy = total - infected;

  // compute average confidence or "overall health"
  const avgConf = total
    ? Math.round((scanned.reduce((a, c) => a + c.confidence, 0) / total) * 100)
    : 0;

  return (
    <div className="bg-green-600 text-white p-6 rounded-xl shadow-md">
      <h3 className="font-semibold">Overall Farm Health</h3>
      <p className="text-4xl font-bold">{avgConf}%</p>
      <p className="text-sm mt-2">{total} scans • Last updated: just now</p>

      <div className="flex gap-6 mt-4">
        <div>
          <p className="text-sm">Healthy</p>
          <p className="font-bold text-lg">{healthy}</p>
        </div>
        <div>
          <p className="text-sm">Need Attention</p>
          <p className="font-bold text-lg">{infected}</p>
        </div>
      </div>
    </div>
  );
}
