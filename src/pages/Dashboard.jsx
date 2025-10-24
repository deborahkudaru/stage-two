import { useEffect, useState } from 'react';
import { TicketAPI } from '../service/api'
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [stats, setStats] = useState({ total:0, open:0, resolved:0 });
  const [err, setErr] = useState('');

  useEffect(() => {
    let mounted = true;
    TicketAPI.list().then(list => {
      if (!mounted) return;
      const total = list.length;
      const open = list.filter(t => t.status === 'open').length;
      const resolved = list.filter(t => t.status === 'closed').length;
      setStats({ total, open, resolved });
    }).catch(e => setErr(e.message || 'Failed to load tickets. Please retry.'));
    return () => { mounted = false; }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">Overview of your support tickets</p>
        </div>

        {err && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {err}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="text-sm font-medium text-gray-500 mb-2">Total Tickets</div>
            <div className="text-3xl font-bold text-gray-900">{stats.total}</div>
            <div className="text-xs text-gray-400 mt-2">All tickets in the system</div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="text-sm font-medium text-gray-500 mb-2">Open Tickets</div>
            <div className="text-3xl font-bold text-green-600">{stats.open}</div>
            <div className="text-xs text-gray-400 mt-2">Requiring attention</div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="text-sm font-medium text-gray-500 mb-2">Resolved</div>
            <div className="text-3xl font-bold text-blue-600">{stats.resolved}</div>
            <div className="text-xs text-gray-400 mt-2">Completed tickets</div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Ticket Management</h2>
              <p className="text-gray-600 mt-1">View and manage all your support tickets</p>
            </div>
            <Link 
              to="/tickets" 
              className="mt-4 sm:mt-0 inline-flex items-center justify-center bg-slate-600 hover:bg-slate-700 text-white font-medium px-6 py-3 rounded-lg transition-colors duration-200"
            >
              Go to Tickets
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;