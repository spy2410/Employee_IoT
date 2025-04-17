import { useState, useEffect } from 'react';
import { MapPin, CheckSquare, Bell, MessageCircle, ChevronRight, Calendar, Clock, User, AlertTriangle } from 'lucide-react';

export default function Supervisor() {
  const [selectedSection, setSelectedSection] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  // Sample data
  const employees = [
    { id: 1, name: "John Doe", position: "Technician", location: "Zone A", status: "active", img: "/api/placeholder/50/50" },
    { id: 2, name: "Jane Smith", position: "Engineer", location: "Zone B", status: "active", img: "/api/placeholder/50/50" },
    { id: 3, name: "Mike Johnson", position: "Supervisor", location: "Zone C", status: "break", img: "/api/placeholder/50/50" },
    { id: 4, name: "Lisa Brown", position: "Technician", location: "Zone A", status: "inactive", img: "/api/placeholder/50/50" },
    { id: 4, name: "Mike Ross", position: "Engineer", location: "Zone D", status: "inactive", img: "/api/placeholder/50/50" },
  ];

  const tasks = [
    { id: 1, employeeId: 1, title: "Equipment Maintenance", status: "completed", completion: "100%", priority: "high" },
    { id: 2, employeeId: 1, title: "Safety Inspection", status: "in-progress", completion: "60%", priority: "medium" },
    { id: 3, employeeId: 2, title: "System Calibration", status: "completed", completion: "100%", priority: "high" },
    { id: 4, employeeId: 3, title: "Inventory Check", status: "pending", completion: "0%", priority: "low" },
  ];

  const alerts = [
    { id: 1, type: "warning", message: "Zone B temperature above threshold", time: "09:45 AM", resolved: false },
    { id: 2, type: "critical", message: "Employee #4 inactive for 30+ mins", time: "10:30 AM", resolved: false },
    { id: 3, type: "info", message: "Scheduled maintenance in Zone C", time: "08:15 AM", resolved: true },
  ];

  const concerns = [
    { id: 1, employeeId: 2, type: "complaint", title: "Equipment malfunction", status: "pending", time: "Yesterday" },
    { id: 2, employeeId: 1, type: "request", title: "Schedule adjustment", status: "resolved", time: "2 days ago" },
    { id: 3, employeeId: 4, type: "doubt", title: "Protocol clarification", status: "in-review", time: "Today" },
  ];


  const zones = {
    "workstation1": { x: [0, 15], y: [0, 15] },
    "workstation2": { x: [20, 35], y: [0, 15] },
    "workstation3": { x: [40, 55], y: [0, 15] },
    "workstation4": { x: [60, 75], y: [0, 15] },
    "workstation5": { x: [80, 95], y: [0, 15] },
    "supervisor_office": { x: [0, 10], y: [20, 30] },
    "canteen": { x: [20, 50], y: [20, 50] },
    "restroom": { x: [60, 80], y: [20, 40] },
  };

  const detectZone = (x, y) => {
    for (let zone in zones) {
      const { x: xRange, y: yRange } = zones[zone];
      if (x >= xRange[0] && x <= xRange[1] && y >= yRange[0] && y <= yRange[1]) {
        return zone;
      }
    }
    return "unknown";
  };

  const [livePositions, setLivePositions] = useState([
    { id: "EMP001", name: "John Doe", x: 5, y: 5 },
    { id: "EMP002", name: "Jane Smith", x: 25, y: 5 },
    { id: "EMP003", name: "Mike Johnson", x: 45, y: 10 },
    { id: "EMP004", name: "Lisa Brown", x: 65, y: 5 },
    { id: "EMP005", name: "Alex King", x: 85, y: 10 },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setLivePositions(prev =>
        prev.map(emp => ({
          ...emp,
          x: Math.max(0, Math.min(95, emp.x + (Math.random() * 10 - 5))), // ±5 movement
          y: Math.max(0, Math.min(50, emp.y + (Math.random() * 10 - 5))),
        }))
      );
    }, 10000); // every 10s

    return () => clearInterval(interval);
  }, []);


  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'break': return 'bg-yellow-500';
      case 'inactive': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };


  const getAlertIcon = (type) => {
    switch (type) {
      case 'warning': return <AlertTriangle className="text-yellow-500" size={18} />;
      case 'critical': return <AlertTriangle className="text-red-500" size={18} />;
      case 'info': return <Bell className="text-blue-500" size={18} />;
      default: return <Bell className="text-gray-500" size={18} />;
    }
  };

  const renderDetailView = () => {
    if (!selectedSection || !selectedItem) return null;

    if (selectedSection === 'tasks') {
      const task = tasks.find(t => t.id === selectedItem);
      const employee = employees.find(e => e.id === task.employeeId);

      return (
        <div className="bg-white rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-4">{task.title}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600 mb-1">Assigned to:</p>
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-gray-200 mr-2"></div>
                <span>{employee.name}</span>
              </div>
            </div>
            <div>
              <p className="text-gray-600 mb-1">Status:</p>
              <span className="px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">{task.status}</span>
            </div>
            <div>
              <p className="text-gray-600 mb-1">Completion:</p>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: task.completion }}></div>
              </div>
              <p className="text-sm mt-1">{task.completion}</p>
            </div>
            <div>
              <p className="text-gray-600 mb-1">Priority:</p>
              <span className={`px-3 py-1 rounded-full text-sm 
                ${task.priority === 'high' ? 'bg-red-100 text-red-800' :
                  task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'}`}>
                {task.priority}
              </span>
            </div>
          </div>
          <div className="mt-6">
            <h4 className="font-semibold mb-2">Task History</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Created task</span>
                <span className="text-gray-500">Apr 14, 9:00 AM</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Started work</span>
                <span className="text-gray-500">Apr 14, 9:30 AM</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Progress update: 60%</span>
                <span className="text-gray-500">Apr 14, 11:15 AM</span>
              </div>
            </div>
          </div>
          <button
            className="mt-6 w-full py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
            onClick={() => {
              setSelectedSection(null);
              setSelectedItem(null);
            }}
          >
            Close Details
          </button>
        </div>
      );
    }

    if (selectedSection === 'alerts') {
      const alert = alerts.find(a => a.id === selectedItem);

      return (
        <div className="bg-white rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            {getAlertIcon(alert.type)}
            <h3 className="text-xl font-bold ml-2">{alert.type.charAt(0).toUpperCase() + alert.type.slice(1)} Alert</h3>
          </div>

          <p className="text-lg mb-4">{alert.message}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-gray-600 mb-1">Reported at:</p>
              <p className="font-medium">{alert.time}</p>
            </div>
            <div>
              <p className="text-gray-600 mb-1">Status:</p>
              <span className={`px-3 py-1 rounded-full text-sm ${alert.resolved ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {alert.resolved ? 'Resolved' : 'Active'}
              </span>
            </div>
          </div>

          <div className="mt-6">
            <h4 className="font-semibold mb-2">Alert History</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Alert triggered</span>
                <span className="text-gray-500">{alert.time}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Notification sent to supervisor</span>
                <span className="text-gray-500">1 minute after alert</span>
              </div>
              {alert.resolved && (
                <div className="flex justify-between text-sm">
                  <span>Issue resolved</span>
                  <span className="text-gray-500">30 minutes after alert</span>
                </div>
              )}
            </div>
          </div>

          <button
            className="mt-6 w-full py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
            onClick={() => {
              setSelectedSection(null);
              setSelectedItem(null);
            }}
          >
            Close Details
          </button>
        </div>
      );
    }

    if (selectedSection === 'concerns') {
      const concern = concerns.find(c => c.id === selectedItem);
      const employee = employees.find(e => e.id === concern.employeeId);

      return (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-4">{concern.title}</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-gray-600 mb-1">Reported by:</p>
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-gray-200 mr-2"></div>
                <span>{employee.name}</span>
              </div>
            </div>
            <div>
              <p className="text-gray-600 mb-1">Type:</p>
              <span className="capitalize">{concern.type}</span>
            </div>
            <div>
              <p className="text-gray-600 mb-1">Reported:</p>
              <span>{concern.time}</span>
            </div>
            <div>
              <p className="text-gray-600 mb-1">Status:</p>
              <span className={`px-3 py-1 rounded-full text-sm 
                ${concern.status === 'resolved' ? 'bg-green-100 text-green-800' :
                  concern.status === 'in-review' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-blue-100 text-blue-800'}`}>
                {concern.status}
              </span>
            </div>
          </div>

          <div className="mb-6">
            <h4 className="font-semibold mb-2">Description</h4>
            <p className="text-gray-700">
              {concern.type === 'complaint'
                ? "Equipment in Zone B has been malfunctioning since yesterday morning. The control panel is unresponsive and showing error code E-42."
                : concern.type === 'request'
                  ? "Request to adjust schedule for next week due to medical appointment. Need to leave early on Tuesday."
                  : "Seeking clarification on the new safety protocol implementation timeline and training requirements."}
            </p>
          </div>

          <div className="mt-6">
            <h4 className="font-semibold mb-2">Resolution Progress</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Submitted</span>
                <span className="text-gray-500">{concern.time}</span>
              </div>
              {concern.status === 'in-review' && (
                <div className="flex justify-between text-sm">
                  <span>Under review by management</span>
                  <span className="text-gray-500">Today, 10:30 AM</span>
                </div>
              )}
              {concern.status === 'resolved' && (
                <>
                  <div className="flex justify-between text-sm">
                    <span>Assigned to HR</span>
                    <span className="text-gray-500">Yesterday, 3:15 PM</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Resolution: Schedule adjusted</span>
                    <span className="text-gray-500">Yesterday, 4:30 PM</span>
                  </div>
                </>
              )}
            </div>
          </div>

          <button
            className="mt-6 w-full py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
            onClick={() => {
              setSelectedSection(null);
              setSelectedItem(null);
            }}
          >
            Close Details
          </button>
        </div>
      );
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Employee Dashboard</h1>
          <div className="flex items-center space-x-4">
            <span className="flex items-center"><Calendar size={18} className="mr-1" /> April 14, 2025</span>
            <span className="flex items-center"><Clock size={18} className="mr-1" /> 12:30 PM</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="">
        {selectedSection && selectedItem ? (
          <div className="mb-6">
            <button
              onClick={() => {
                setSelectedSection(null);
                setSelectedItem(null);
              }}
              className="flex items-center text-blue-600 hover:text-blue-800"
            >
              <ChevronRight className="rotate-180" size={16} />
              Back to Dashboard
            </button>
            <div className="mt-4">
              {renderDetailView()}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Live Employee Tracking */}
            <div className="bg-white rounded-lg shadow-md p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold flex items-center">
                  <MapPin size={18} className="mr-2 text-blue-500" />
                  Live Employee Tracking
                </h2>
              </div>

              <div className="relative bg-gray-200 rounded-lg h-64 mb-4 overflow-hidden">
                {/* This would be your actual map component */}
                <div className="absolute inset-0 p-2 text-center flex flex-col justify-center">
                  {/* <p className="text-gray-500">[Interactive UWB tracking map would render here]</p>
                  <p className="text-sm text-gray-400">Shows real-time employee locations across facility zones</p> */}
                </div>

                {/* Placeholder employee location indicators */}
                {livePositions.map((emp, index) => (
                  <div
                    key={emp.id}
                    className="absolute w-4 h-4 rounded-full animate-pulse"
                    style={{
                      left: `${emp.x}%`,
                      top: `${emp.y}%`,
                      backgroundColor: ["#3b82f6", "#10b981", "#facc15", "#ef4444", "#8b5cf6"][index % 5],
                    }}
                    title={`${emp.name} - ${detectZone(emp.x, emp.y)}`}
                  />
                ))}

              </div>

              <div className="space-y-2">
                {employees.map(employee => (
                  <div key={employee.id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                    <div className="flex items-center">
                      <img src={employee.img} alt={employee.name} className="w-8 h-8 rounded-full mr-3" />
                      <div>
                        <p className="font-medium">{employee.name}</p>
                        <p className="text-sm text-gray-500">{employee.position}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm text-gray-600 mr-2">{employee.location}</span>
                      <span className={`w-3 h-3 rounded-full ${getStatusColor(employee.status)}`}></span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Task Completion */}
            <div className="bg-white rounded-lg shadow-md p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold flex items-center">
                  <CheckSquare size={18} className="mr-2 text-green-500" />
                  Task Completion
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                {employees.map(employee => {
                  const employeeTasks = tasks.filter(task => task.employeeId === employee.id);
                  const completedTasks = employeeTasks.filter(task => task.status === 'completed').length;
                  const totalTasks = employeeTasks.length;

                  return (
                    <div key={employee.id} className="bg-gray-50 p-3 rounded-lg">
                      <div className="flex items-center mb-2">
                        <img src={employee.img} alt={employee.name} className="w-8 h-8 rounded-full mr-2" />
                        <span className="font-medium">{employee.name}</span>
                      </div>
                      <div className="mb-2">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Tasks Completed</span>
                          <span>{completedTasks}/{totalTasks}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-green-500 h-2 rounded-full"
                            style={{ width: `${totalTasks ? (completedTasks / totalTasks) * 100 : 0}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <h3 className="font-medium text-gray-700 mb-2">Recent Tasks</h3>
              <div className="space-y-2">
                {tasks.map(task => (
                  <div
                    key={task.id}
                    className="p-3 border border-gray-200 rounded-lg hover:bg-blue-50 cursor-pointer"
                    onClick={() => {
                      setSelectedSection('tasks');
                      setSelectedItem(task.id);
                    }}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">{task.title}</h4>
                        <p className="text-sm text-gray-500">
                          {employees.find(e => e.id === task.employeeId).name}
                        </p>
                      </div>
                      <div className="flex items-center">
                        <span className={`px-2 py-1 rounded-full text-xs ${task.status === 'completed' ? 'bg-green-100 text-green-800' :
                          task.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                          {task.status}
                        </span>
                        <ChevronRight size={16} className="ml-2 text-gray-400" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Alerts */}
            <div className="bg-white rounded-lg shadow-md p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold flex items-center">
                  <Bell size={18} className="mr-2 text-yellow-500" />
                  Alerts
                </h2>
              </div>

              <div className="space-y-3">
                {alerts.map(alert => (
                  <div
                    key={alert.id}
                    className={`p-3 rounded-lg hover:bg-blue-50 cursor-pointer ${!alert.resolved ? 'bg-yellow-50 border-l-4 border-yellow-500' : 'bg-gray-50'
                      }`}
                    onClick={() => {
                      setSelectedSection('alerts');
                      setSelectedItem(alert.id);
                    }}
                  >
                    <div className="flex justify-between">
                      <div className="flex items-start">
                        {getAlertIcon(alert.type)}
                        <div className="ml-2">
                          <p className="font-medium">{alert.message}</p>
                          <p className="text-sm text-gray-500">{alert.time}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span className={`px-2 py-1 rounded-full text-xs ${alert.resolved ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                          {alert.resolved ? 'Resolved' : 'Active'}
                        </span>
                        <ChevronRight size={16} className="ml-2 text-gray-400" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Employee Concerns */}
            <div className="bg-white rounded-lg shadow-md p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold flex items-center">
                  <MessageCircle size={18} className="mr-2 text-purple-500" />
                  Employee Concerns
                </h2>
              </div>

              <div className="space-y-3">
                {concerns.map(concern => (
                  <div
                    key={concern.id}
                    className="p-3 bg-gray-50 rounded-lg hover:bg-blue-50 cursor-pointer"
                    onClick={() => {
                      setSelectedSection('concerns');
                      setSelectedItem(concern.id);
                    }}
                  >
                    <div className="flex justify-between">
                      <div>
                        <div className="flex items-center">
                          <span className={`px-2 py-1 rounded-full text-xs mr-2 ${concern.type === 'complaint' ? 'bg-red-100 text-red-800' :
                            concern.type === 'request' ? 'bg-blue-100 text-blue-800' :
                              'bg-purple-100 text-purple-800'
                            }`}>
                            {concern.type}
                          </span>
                          <h4 className="font-medium">{concern.title}</h4>
                        </div>
                        <p className="text-sm text-gray-500">
                          {employees.find(e => e.id === concern.employeeId).name} • {concern.time}
                        </p>
                      </div>
                      <div className="flex items-center">
                        <span className={`px-2 py-1), text-xs rounded-full ${concern.status === 'resolved' ? 'bg-green-100 text-green-800' :
                          concern.status === 'in-review' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                          {concern.status}
                        </span>
                        <ChevronRight size={16} className="ml-2 text-gray-400" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}