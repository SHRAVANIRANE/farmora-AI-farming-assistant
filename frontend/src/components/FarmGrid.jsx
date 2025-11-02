import React from "react";

// This helper object maps our "status" to a Tailwind CSS class
const statusClasses = {
  healthy: "bg-green-100 hover:bg-green-200 text-green-800",
  infected: "bg-red-500 hover:bg-red-600 text-white font-bold",
  treated: "bg-blue-400 hover:bg-blue-500 text-white",
  selected: "border-4 border-blue-500 shadow-lg scale-105 ring-4 ring-blue-300",
};

// A single cell in our grid
function GridCell({ cell, onClick }) {
  // Base styles for all cells
  let cellStyle =
    "w-16 h-16 flex justify-center items-center cursor-pointer border border-gray-400 transition-all duration-200 rounded-md font-medium";

  // Add the status-specific style
  cellStyle += ` ${statusClasses[cell.status] || ""}`;

  return (
    <div className={cellStyle} onClick={() => onClick(cell.id)}>
      {cell.id}
    </div>
  );
}

// The main grid component
function FarmGrid({ gridData, onCellClick, selectedCell }) {
  return (
    <div className="grid grid-cols-5 gap-2 p-2 bg-yellow-900/50 rounded-lg border-4 border-yellow-800">
      {gridData.map((cell) => (
        <GridCell
          key={cell.id}
          // Check if this cell is the selectedCell and apply 'selected' status
          cell={
            cell.id === selectedCell ? { ...cell, status: "selected" } : cell
          }
          onClick={onCellClick}
        />
      ))}
    </div>
  );
}

export default FarmGrid;
