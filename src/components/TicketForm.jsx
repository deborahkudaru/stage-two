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
    priority: initial.priority || 'medium'
  });
  const [errors, setErrors] = useState({});

  const handle = (k,v)=> setValues(prev=>({ ...prev, [k]: v }));

  const submit = (e) => {
    e?.preventDefault();
    const errs = validate(values);
    setErrors(errs);
    if (Object.keys(errs).length) return;
    onSubmit(values);
  };

  return (
    <form onSubmit={submit} className="space-y-3 bg-slate-50 p-3 rounded">
      <div>
        <label className="block text-sm font-medium">Title</label>
        <input value={values.title} onChange={e=>handle('title', e.target.value)} className="w-full border rounded px-3 py-2" />
        {errors.title && <div className="text-red-600 text-sm">{errors.title}</div>}
      </div>

      <div>
        <label className="block text-sm font-medium">Status</label>
        <select value={values.status} onChange={e=>handle('status', e.target.value)} className="w-full border rounded px-3 py-2">
          <option value="open">open</option>
          <option value="in_progress">in_progress</option>
          <option value="closed">closed</option>
        </select>
        {errors.status && <div className="text-red-600 text-sm">{errors.status}</div>}
      </div>

      <div>
        <label className="block text-sm font-medium">Description</label>
        <textarea value={values.description} onChange={e=>handle('description', e.target.value)} className="w-full border rounded px-3 py-2" rows="4" />
        {errors.description && <div className="text-red-600 text-sm">{errors.description}</div>}
      </div>

      <div className="flex gap-2">
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Save</button>
        {onCancel && <button type="button" onClick={onCancel} className="px-4 py-2 rounded border">Cancel</button>}
      </div>
    </form>
  );
}
