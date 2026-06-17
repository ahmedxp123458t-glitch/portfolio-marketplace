import React from 'react';

const Analytics = ({ portfolios, projects, reviews }) => {
  const avgRating = reviews.length ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1) : '0.0';
  return (
    <div className="page">
      <h2>Analytics</h2>
      <div className="report-grid">
        <div className="report-card"><h3>Total Portfolios</h3><p>{portfolios.length}</p></div>
        <div className="report-card"><h3>Total Projects</h3><p>{projects.length}</p></div>
        <div className="report-card"><h3>Total Reviews</h3><p>{reviews.length}</p></div>
        <div className="report-card"><h3>Average Rating</h3><p>★ {avgRating}</p></div>
      </div>
    </div>
  );
};

export default Analytics;
