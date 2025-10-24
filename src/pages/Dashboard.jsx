import { useEffect, useState } from 'react';
import { TicketAPI } from '../service/api'
import { Link } from 'react-router-dom';

export default function Dashboard() {
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
    <div>
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      {err && <div className="text-red-600 mb-4">{err}</div>}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card p-4 bg-white rounded shadow">
          <div className="text-sm text-gray-500">Total tickets</div>
          <div className="text-2xl font-bold">{stats.total}</div>
        </div>
        <div className="card p-4 bg-white rounded shadow">
          <div className="text-sm text-gray-500">Open</div>
          <div className="text-2xl font-bold text-green-700">{stats.open}</div>
        </div>
        <div className="card p-4 bg-white rounded shadow">
          <div className="text-sm text-gray-500">Resolved</div>
          <div className="text-2xl font-bold text-gray-700">{stats.resolved}</div>
        </div>
      </div>

      <div className="mt-6">
        <Link to="/tickets" className="inline-block bg-blue-600 text-white px-4 py-2 rounded">Go to Tickets</Link>
      </div>
    </div>
  );
}
