import React, { useState, useEffect } from 'react';

function ClinicForm({ clinic, onSave, onCancel }) {
  const [clinicName, setClinicName] = useState('');

  useEffect(() => {
    if (clinic) {
      setClinicName(clinic.clinicName);
    } else {
      setClinicName('');
    }
  }, [clinic]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!clinicName.trim()) {
      alert('Tên phòng khám không được để trống');
      return;
    }
    onSave({ ...clinic, clinicName: clinicName.trim() });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-3">
      <div className="mb-3">
        <label className="form-label">Tên phòng khám</label>
        <input
          type="text"
          className="form-control"
          value={clinicName}
          onChange={e => setClinicName(e.target.value)}
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

export default ClinicForm;
