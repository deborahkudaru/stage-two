import React, { useEffect, useState } from 'react';
import { TicketAPI } from '../../service/api';
import StatusBadge from '../../components/StatusBadge';
import TicketForm from '../../components/TicketForm';

export default function TicketList() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const load = () => {
    setLoading(true); setErr('');
    TicketAPI.list().then(list => { setTickets(list); setLoading(false); }).catch(e => { setErr(e.message); setLoading(false); });
  };

  useEffect(()=>{ load(); }, []);

  const onCreate = async (data) => {
    try {
      await TicketAPI.create(data);
      load();
      setShowForm(false);
    } catch (e) { setErr(e.message || 'Failed to save ticket. Please retry.'); }
  };

  const onUpdate = async (id, patch) => {
    try { await TicketAPI.update(id, patch); load(); setEditing(null); }
    catch(e){ setErr(e.message || 'Failed to save ticket. Please retry.'); }
  };

  const onDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this ticket?')) return;
    try { await TicketAPI.remove(id); load(); }
    catch(e){ setErr(e.message || 'Failed to delete ticket. Please retry.'); }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Tickets</h2>
        <div>
          <button onClick={()=>{ setShowForm(s=>!s); setEditing(null); }} className="bg-blue-600 text-white px-3 py-1 rounded">
            {showForm ? 'Close' : 'Create Ticket'}
          </button>
        </div>
      </div>

      {showForm && <div className="mb-4"><TicketForm onSubmit={onCreate} /></div>}
      {err && <div className="text-red-600 mb-4">{err}</div>}
      {loading ? <div>Loading…</div> : (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {tickets.map(t => (
            <div key={t.id} className="bg-white p-4 rounded shadow">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">{t.title}</h3>
                  <p className="text-sm text-gray-500">{t.description?.slice(0,120)}</p>
                </div>
                <div className="space-y-1 text-right">
                  <StatusBadge status={t.status} />
                  <div className="mt-2">
                    <button onClick={()=>setEditing(t)} className="text-sm mr-2">Edit</button>
                    <button onClick={()=>onDelete(t.id)} className="text-sm text-red-600">Delete</button>
                  </div>
                </div>
              </div>

              {editing && editing.id === t.id && (
                <div className="mt-3">
                  <TicketForm initial={editing} onSubmit={(data)=>onUpdate(t.id, data)} onCancel={()=>setEditing(null)} />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
