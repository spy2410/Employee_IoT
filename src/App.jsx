import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Supervisor from './components/Supervisor';

export default function App() {
  const [activeSection, setActiveSection] = useState('dashboard');

  const renderContent = () => {
    // For now, just show the supervisor dashboard for the main dashboard section
    // Other sections would be implemented as needed
    if (activeSection === 'dashboard') {
      return <Supervisor />;
    }
    
    // Placeholder for other sections
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">
          {activeSection.includes('-') 
            ? `${activeSection.split('-')[0].charAt(0).toUpperCase() + activeSection.split('-')[0].slice(1)} - ${activeSection.split('-')[1].charAt(0).toUpperCase() + activeSection.split('-')[1].slice(1)}`
            : activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}
        </h1>
        <p className="text-gray-600">This section is under development.</p>
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      <div className="flex-1 overflow-y-auto">
        {renderContent()}
      </div>
    </div>
  );
}