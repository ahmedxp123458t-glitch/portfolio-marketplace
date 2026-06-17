import React from 'react';

const Navbar = ({ page, setPage }) => (
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

export default Navbar;
