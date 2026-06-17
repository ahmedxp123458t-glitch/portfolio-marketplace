import React from 'react';

const PortfolioList = ({ portfolios, users, getRating, onContact }) => (
  <div className="page">
    <h2>Portfolios</h2>
    <div className="portfolio-grid">
      {portfolios.map(p => {
        const user = users.find(u => u._id === p.userId);
        const rating = getRating(p._id);
        return (
          <div key={p._id} className="portfolio-card">
            <div className="card-header"><h3>{p.title}</h3><div className="rating">★ {rating}</div></div>
            <p className="card-user">{user ? user.name : 'Unknown'}</p>
            <p className="card-desc">{p.description}</p>
            <div className="card-skills">{p.skills.map(s => <span key={s} className="skill-tag">{s}</span>)}</div>
            <button className="btn-contact" onClick={() => onContact(p._id)}>Contact</button>
          </div>
        );
      })}
    </div>
  </div>
);

export default PortfolioList;
