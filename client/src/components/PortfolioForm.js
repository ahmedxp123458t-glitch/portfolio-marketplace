import React, { useState } from 'react';

const PortfolioForm = ({ onAdd }) => {
  const [form, setForm] = useState({ userId: '', title: '', description: '', skills: '' });
  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({ ...form, skills: form.skills.split(',').map(s => s.trim()) });
    setForm({ userId: '', title: '', description: '', skills: '' });
  };
  return (
    <div className="page">
      <h2>Create Portfolio</h2>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group"><label>User ID</label><input value={form.userId} onChange={e => setForm({ ...form, userId: e.target.value })} required /></div>
        <div className="form-group"><label>Title</label><input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required /></div>
        <div className="form-group"><label>Description</label><textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} required rows={3}></textarea></div>
        <div className="form-group"><label>Skills (comma separated)</label><input value={form.skills} onChange={e => setForm({ ...form, skills: e.target.value })} placeholder="React, Node.js" /></div>
        <button type="submit" className="btn-primary">Create Portfolio</button>
      </form>
    </div>
  );
};

export default PortfolioForm;
