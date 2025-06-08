import React, { useState, useEffect } from 'react';

function SpecialtyForm({ specialty, onSave, onCancel }) {
  const [specialtyName, setSpecialtyName] = useState('');

  useEffect(() => {
    setSpecialtyName(specialty ? specialty.specialtyName : '');
  }, [specialty]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!specialtyName.trim()) {
      alert('Tên chuyên khoa không được để trống');
      return;
    }
    onSave({ ...specialty, specialtyName: specialtyName.trim() });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-3">
      <div className="mb-3">
        <label className="form-label">Tên chuyên khoa</label>
        <input
          type="text"
          className="form-control"
          value={specialtyName}
          onChange={e => setSpecialtyName(e.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-primary me-2">
        Lưu
      </button>
      <button type="button" className="btn btn-secondary" onClick={onCancel}>
        Hủy
      </button>
    </form>
  );
}
export default SpecialtyForm;
