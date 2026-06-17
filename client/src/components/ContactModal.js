import React, { useState } from 'react';

const ContactModal = ({ show, onClose }) => {
  const [msg, setMsg] = useState('');
  if (!show) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <h3>Send Message</h3>
        <textarea value={msg} onChange={e => setMsg(e.target.value)} placeholder="Write your message..." rows={4}></textarea>
        <div className="modal-actions">
          <button className="btn-primary" onClick={() => { alert('Message sent!'); onClose(); setMsg(''); }}>Send</button>
          <button className="btn-secondary" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default ContactModal;
