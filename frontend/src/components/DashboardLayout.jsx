import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6 bg-green-50 min-h-screen">
        <Outlet />
      </div>
    </div>
  );
}
