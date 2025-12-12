import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="w-64 h-screen bg-white shadow-md p-6 space-y-6">
      <Link to="/dashboard" className="block hover:text-green-600">
        📊 Dashboard
      </Link>

      <Link to="/weather" className="block hover:text-green-600">
        🌦️ Weather Prediction
      </Link>

      <Link to="/crop-health" className="block hover:text-green-600">
        🩺 Crop Health
      </Link>

      <Link to="/irrigation" className="block hover:text-green-600">
        💧 Irrigation Advisor
      </Link>
    </div>
  );
}

export default Sidebar;
