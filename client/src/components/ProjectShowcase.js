import React from 'react';

const ProjectShowcase = ({ projects }) => (
  <div className="page">
    <h2>Project Showcase</h2>
    <div className="showcase-grid">
      {projects.map(p => (
        <div key={p._id} className="showcase-card">
          <div className="showcase-img">
            {p.image ? <img src={p.image} alt={p.title} /> : <div className="img-placeholder">{p.title[0]}</div>}
          </div>
          <h3>{p.title}</h3>
          <p>{p.description}</p>
          {p.link && <a href={p.link} target="_blank" rel="noreferrer" className="project-link">View Project →</a>}
        </div>
      ))}
    </div>
  </div>
);

export default ProjectShowcase;
