import { CheckSquare, ChevronRight } from 'lucide-react';

// components/TaskCompletion.jsx
export default function TaskCompletion({ employees, tasks, setSelectedItem, setSelectedSection }) {
  const getEmployeeName = (id) => {
    const emp = employees.find(e => e.id === id);
    return emp ? emp.name : "Unknown";
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending": return "bg-yellow-100 text-yellow-700";
      case "in_progress": return "bg-blue-100 text-blue-700";
      case "completed": return "bg-green-100 text-green-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const getTimeAgo = (timestamp) => {
    const start = new Date(timestamp);
    const now = new Date();
    const diff = Math.floor((now - start) / 1000); // seconds
    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    return `${Math.floor(diff / 3600)}h ago`;
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4">Live Task Progress</h2>
      <div className="space-y-4">
        {tasks.map(task => (
          <div
            key={task.id}
            className="border p-4 rounded-lg hover:shadow cursor-pointer transition"
            onClick={() => {
              setSelectedItem(task);
              setSelectedSection("tasks");
            }}
          >
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-semibold text-lg">{task.title}</h3>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                {task.status.replace("_", " ")}
              </span>
            </div>
            <p className="text-sm text-gray-500 mb-2">
              Assigned to: <span className="font-medium">{getEmployeeName(task.employeeId)}</span> • {getTimeAgo(task.startTime)}
            </p>

            <div className="w-full bg-gray-200 rounded h-2">
              <div
                className="bg-blue-600 h-2 rounded"
                style={{ width: task.completion }}
              ></div>
            </div>
            <p className="text-sm text-right mt-1 text-gray-600">
              {task.completion} complete
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
