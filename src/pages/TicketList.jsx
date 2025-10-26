import React, { useEffect, useState } from 'react';
import { TicketAPI } from '../service/api';
import StatusBadge from '../components/StatusBadge';
import TicketForm from '../components/TicketForm';
import toast from 'react-hot-toast';

const TicketList = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [deleteModal, setDeleteModal] = useState({ show: false, ticket: null });

  const load = () => {
    setLoading(true); 
    TicketAPI.list()
      .then(list => { 
        setTickets(list); 
        setLoading(false); 
      })
      .catch(e => { 
        const errorMsg = e.message || 'Failed to load tickets. Please retry.';
        toast.error(errorMsg);
        setLoading(false); 
      });
  };

  useEffect(() => { load(); }, []);

  const onCreate = async (data) => {
    try {
      await TicketAPI.create(data);
      load();
      setShowForm(false);
      toast.success('Ticket created successfully!');
    } catch (e) { 
      const errorMsg = e.message || 'Failed to save ticket. Please retry.';
      toast.error(errorMsg);
    }
  };

  const onUpdate = async (id, patch) => {
    try { 
      await TicketAPI.update(id, patch); 
      load(); 
      setEditing(null); 
      toast.success('Ticket updated successfully!');
    } catch(e) { 
      const errorMsg = e.message || 'Failed to save ticket. Please retry.';
      toast.error(errorMsg);
    }
  };

  const onDelete = async (id) => {
    try { 
      await TicketAPI.remove(id); 
      load(); 
      setDeleteModal({ show: false, ticket: null });
      toast.success('Ticket deleted successfully!');
    } catch(e) { 
      const errorMsg = e.message || 'Failed to delete ticket. Please retry.';
      toast.error(errorMsg);
    }
  };

  const openDeleteModal = (ticket) => {
    setDeleteModal({ show: true, ticket });
  };

  const closeDeleteModal = () => {
    setDeleteModal({ show: false, ticket: null });
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 min-h-screen">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Tickets</h1>
        </div>
        <button 
          onClick={() => { setShowForm(s => !s); setEditing(null); }} 
          className="bg-slate-600 hover:bg-slate-700 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-medium transition-colors duration-200 text-sm sm:text-base whitespace-nowrap"
        >
          {showForm ? '✕ Close' : '+ Create Ticket'}
        </button>
      </div>

      {/* form */}
      {showForm && (
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200 mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">Create New Ticket</h2>
          <TicketForm onSubmit={onCreate} />
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-b-2 border-slate-600"></div>
        </div>
      ) : (
        <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {tickets.map(t => (
            <div key={t.id} className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-3 sm:mb-4 gap-2">
                <h3 className="font-semibold text-gray-900 text-base sm:text-lg pr-2 wrap-break-word">{t.title}</h3>
                <StatusBadge status={t.status} />
              </div>

              <p className="text-gray-600 text-sm mb-3 sm:mb-4 leading-relaxed wrap-break-word">
                {t.description?.slice(0, 60)}
                {t.description?.length > 60 && '...'}
              </p>

              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center pt-3 sm:pt-4 border-t border-gray-100 gap-3 sm:gap-0">
                <div className="flex space-x-3">
                  <button 
                    onClick={() => setEditing(t)} 
                    className="text-slate-600 hover:text-slate-800 font-medium text-sm transition-colors"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => openDeleteModal(t)} 
                    className="text-red-600 hover:text-red-800 font-medium text-sm transition-colors"
                  >
                    Delete
                  </button>
                </div>
                <div className="text-xs text-gray-500">
                  ID: {t.id}
                </div>
              </div>

              {editing && editing.id === t.id && (
                <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-200">
                  <h4 className="font-medium text-gray-900 mb-2 sm:mb-3 text-sm sm:text-base">Edit Ticket</h4>
                  <TicketForm 
                    initial={editing} 
                    onSubmit={(data) => onUpdate(t.id, data)} 
                    onCancel={() => setEditing(null)} 
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && tickets.length === 0 && !showForm && (
        <div className="text-center py-12">
          <div className="text-5xl sm:text-6xl mb-4">🎫</div>
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">No tickets found</h3>
          <p className="text-sm sm:text-base text-gray-600 mb-6 px-4">Get started by creating your first ticket</p>
          <button 
            onClick={() => setShowForm(true)} 
            className="bg-slate-600 hover:bg-slate-700 text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg font-medium transition-colors duration-200 text-sm sm:text-base"
          >
            Create Your First Ticket
          </button>
        </div>
      )}

      {/* Delete confirmation modal */}
      {deleteModal.show && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-5 sm:p-6 mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900">Confirm Deletion</h3>
              <button 
                onClick={closeDeleteModal}
                className="text-gray-400 hover:text-gray-600 transition-colors text-xl"
              >
                ✕
              </button>
            </div>
            
            <p className="text-sm sm:text-base text-gray-600 mb-6">
              Are you sure you want to delete the ticket "<span className="font-semibold wrap-break-word">{deleteModal.ticket?.title}</span>"? This action cannot be undone.
            </p>
            
            <div className="flex flex-col-reverse sm:flex-row gap-3 sm:justify-end">
              <button 
                onClick={closeDeleteModal}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm sm:text-base"
              >
                Cancel
              </button>
              <button 
                onClick={() => onDelete(deleteModal.ticket.id)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm sm:text-base"
              >
                Delete Ticket
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TicketList;