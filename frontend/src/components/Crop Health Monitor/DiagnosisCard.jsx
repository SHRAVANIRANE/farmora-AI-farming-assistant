export default function FieldCard({ field }) {
  const getColor = (score) => {
    if (score >= 90) return "bg-green-500";
    if (score >= 75) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="p-4 bg-green-50 rounded-xl border border-green-100 hover:shadow-md transition">
      <div className="flex justify-between">
        <div>
          <h3 className="font-semibold text-green-900">{field.name}</h3>
          <p className="text-sm text-gray-600">
            {field.crop} • {field.acres} Acres
          </p>
        </div>

        <span className="text-green-600 text-xl">
          {field.score >= 90 ? "✔" : field.score >= 75 ? "⚠️" : "❌"}
        </span>
      </div>

      <p className="text-sm font-semibold mt-2 text-gray-700">
        Health Score: {field.score}%
      </p>

      <div className="w-full h-2 bg-gray-200 rounded-full mt-2">
        <div
          className={`h-2 rounded-full ${getColor(field.score)}`}
          style={{ width: `${field.score}%` }}
        ></div>
      </div>
    </div>
  );
}
