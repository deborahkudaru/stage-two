import { useState } from 'react';

const validate = (v) => {
  const errors = {};
  if (!v.title || v.title.trim().length < 3) errors.title = 'Title must be at least 3 characters';
  const allowed = ['open','in_progress','closed'];
  if (!v.status || !allowed.includes(v.status)) errors.status = 'Status must be one of: open, in_progress, closed';
  if (v.description && v.description.length > 2000) errors.description = 'Description too long';
  return errors;
};

export default function TicketForm({ initial = {}, onSubmit, onCancel }) {
  const [values, setValues] = useState({
    title: initial.title || '',
    description: initial.description || '',
    status: initial.status || 'open',
  });
  const [errors, setErrors] = useState({});

  const handle = (k,v) => setValues(prev => ({ ...prev, [k]: v }));

  const submit = (e) => {
    e?.preventDefault();
    const errs = validate(values);
    setErrors(errs);
    if (Object.keys(errs).length) return;
    onSubmit(values);
  };

  return (
    <form onSubmit={submit} className="space-y-4 sm:space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
          Title <span className="text-red-500">*</span>
        </label>
        <input 
          value={values.title} 
          onChange={e => handle('title', e.target.value)} 
          className={`w-full border rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-slate-600 focus:border-transparent transition-colors ${
            errors.title ? 'border-red-300' : 'border-gray-300'
          }`}
          placeholder="Enter ticket title"
        />
        {errors.title && (
          <div className="text-red-600 text-xs sm:text-sm mt-1.5 sm:mt-2 flex items-center">
            <span className="mr-1">⚠</span>
            {errors.title}
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
          Status <span className="text-red-500">*</span>
        </label>
        <select 
          value={values.status} 
          onChange={e => handle('status', e.target.value)} 
          className={`w-full border rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-slate-600 focus:border-transparent transition-colors ${
            errors.status ? 'border-red-300' : 'border-gray-300'
          }`}
        >
          <option value="open">Open</option>
          <option value="in_progress">In Progress</option>
          <option value="closed">Closed</option>
        </select>
        {errors.status && (
          <div className="text-red-600 text-xs sm:text-sm mt-1.5 sm:mt-2 flex items-center">
            <span className="mr-1">⚠</span>
            {errors.status}
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
          Description
          <span className="text-gray-500 text-xs font-normal ml-2">
            {values.description.length}/2000
          </span>
        </label>
        <textarea 
          value={values.description} 
          onChange={e => handle('description', e.target.value)} 
          className={`w-full border rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-slate-600 focus:border-transparent transition-colors resize-none ${
            errors.description ? 'border-red-300' : 'border-gray-300'
          }`} 
          rows="4"
          placeholder="Describe the issue or request..."
        />
        {errors.description && (
          <div className="text-red-600 text-xs sm:text-sm mt-1.5 sm:mt-2 flex items-center">
            <span className="mr-1">⚠</span>
            {errors.description}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col-reverse sm:flex-row gap-2 sm:gap-3 pt-2 sm:pt-4">
        {onCancel && (
          <button 
            type="button" 
            onClick={onCancel}
            className="px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-medium border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors duration-200 flex-1 text-sm sm:text-base"
          >
            Cancel
          </button>
        )}
        <button 
          type="submit" 
          className="bg-slate-600 hover:bg-slate-700 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-medium transition-colors duration-200 flex-1 text-sm sm:text-base"
        >
          {initial.id ? 'Update Ticket' : 'Create Ticket'}
        </button>
      </div>
    </form>
  );
}