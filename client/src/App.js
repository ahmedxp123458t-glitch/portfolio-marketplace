import React from 'react';

const App = () => {
  const [page, setPage] = React.useState('portfolios');
  const [portfolios, setPortfolios] = React.useState([]);
  const [users, setUsers] = React.useState([]);
  const [reviews, setReviews] = React.useState([]);
  const [projects, setProjects] = React.useState([]);
  const [showContact, setShowContact] = React.useState(null);
  const [contactMsg, setContactMsg] = React.useState('');

  React.useEffect(() => {
    fetch('/api/portfolios').then(r => r.json()).then(setPortfolios).catch(() => {});
    fetch('/api/users').then(r => r.json()).then(setUsers).catch(() => {});
    fetch('/api/reviews').then(r => r.json()).then(setReviews).catch(() => {});
    fetch('/api/projects').then(r => r.json()).then(setProjects).catch(() => {});
  }, []);

  const getPortfolioRating = (pid) => {
    const rs = reviews.filter(r => r.portfolioId === pid);
    return rs.length ? (rs.reduce((s, r) => s + r.rating, 0) / rs.length).toFixed(1) : '0.0';
  };

  const Navbar = () => (
    <nav className="navbar">
      <div className="nav-brand">Portfolio Marketplace</div>
      <div className="nav-links">
        <button className={page === 'portfolios' ? 'active' : ''} onClick={() => setPage('portfolios')}>Portfolios</button>
        <button className={page === 'create' ? 'active' : ''} onClick={() => setPage('create')}>Create Portfolio</button>
        <button className={page === 'showcase' ? 'active' : ''} onClick={() => setPage('showcase')}>Showcase</button>
        <button className={page === 'analytics' ? 'active' : ''} onClick={() => setPage('analytics')}>Analytics</button>
      </div>
    </nav>
  );

  const PortfolioList = () => (
    <div className="page">
      <h2>Portfolios</h2>
      <div className="portfolio-grid">
        {portfolios.map(p => {
          const user = users.find(u => u._id === p.userId);
          const rating = getPortfolioRating(p._id);
          return (
            <div key={p._id} className="portfolio-card">
              <div className="card-header"><h3>{p.title}</h3><div className="rating">★ {rating}</div></div>
              <p className="card-user">{user ? user.name : 'Unknown'}</p>
              <p className="card-desc">{p.description}</p>
              <div className="card-skills">{p.skills.map(s => <span key={s} className="skill-tag">{s}</span>)}</div>
              <button className="btn-contact" onClick={() => setShowContact(p._id)}>Contact</button>
            </div>
          );
        })}
      </div>
      {showContact && (
        <div className="modal-overlay" onClick={() => setShowContact(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h3>Send Message</h3>
            <textarea value={contactMsg} onChange={e => setContactMsg(e.target.value)} placeholder="Write your message..." rows={4}></textarea>
            <div className="modal-actions">
              <button className="btn-primary" onClick={() => { alert('Message sent!'); setShowContact(null); setContactMsg(''); }}>Send</button>
              <button className="btn-secondary" onClick={() => setShowContact(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const PortfolioForm = () => {
    const [form, setForm] = React.useState({ userId: '', title: '', description: '', skills: '' });
    const handleSubmit = (e) => {
      e.preventDefault();
      const body = { ...form, skills: form.skills.split(',').map(s => s.trim()) };
      fetch('/api/portfolios', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
        .then(r => r.json()).then(p => { setPortfolios([...portfolios, p]); setForm({ userId: '', title: '', description: '', skills: '' }); });
    };
    return (
      <div className="page">
        <h2>Create Portfolio</h2>
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>User ID</label>
            <input value={form.userId} onChange={e => setForm({ ...form, userId: e.target.value })} required />
          </div>
          <div className="form-group">
            <label>Title</label>
            <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} required rows={3}></textarea>
          </div>
          <div className="form-group">
            <label>Skills (comma separated)</label>
            <input value={form.skills} onChange={e => setForm({ ...form, skills: e.target.value })} placeholder="React, Node.js, MongoDB" />
          </div>
          <button type="submit" className="btn-primary">Create Portfolio</button>
        </form>
      </div>
    );
  };

  const ProjectShowcase = () => (
    <div className="page">
      <h2>Project Showcase</h2>
      <div className="showcase-grid">
        {projects.map(p => (
          <div key={p._id} className="showcase-card">
            <div className="showcase-img">{p.image ? <img src={p.image} alt={p.title} /> : <div className="img-placeholder">{p.title[0]}</div>}</div>
            <h3>{p.title}</h3>
            <p>{p.description}</p>
            {p.link && <a href={p.link} target="_blank" rel="noreferrer" className="project-link">View Project →</a>}
          </div>
        ))}
      </div>
    </div>
  );

  const Analytics = () => {
    const totalPortfolios = portfolios.length;
    const totalProjects = projects.length;
    const totalReviews = reviews.length;
    const avgRating = reviews.length ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1) : '0.0';
    return (
      <div className="page">
        <h2>Analytics</h2>
        <div className="report-grid">
          <div className="report-card"><h3>Total Portfolios</h3><p>{totalPortfolios}</p></div>
          <div className="report-card"><h3>Total Projects</h3><p>{totalProjects}</p></div>
          <div className="report-card"><h3>Total Reviews</h3><p>{totalReviews}</p></div>
          <div className="report-card"><h3>Average Rating</h3><p>★ {avgRating}</p></div>
        </div>
      </div>
    );
  };

  const renderPage = () => {
    switch (page) {
      case 'portfolios': return <PortfolioList />;
      case 'create': return <PortfolioForm />;
      case 'showcase': return <ProjectShowcase />;
      case 'analytics': return <Analytics />;
      default: return <PortfolioList />;
    }
  };

  return <div className="app"><Navbar /><main className="main-content">{renderPage()}</main></div>;
};

export default App;
