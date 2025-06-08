import React from 'react';

function ClinicDetail({ clinic, onClose }) {
  if (!clinic) return null;

  return (
    <div className="card mb-3">
      <div className="card-header">
        Chi tiết Phòng khám #{clinic.clinicId}
        <button type="button" className="btn btn-sm btn-outline-secondary float-end" onClick={onClose}>
          Đóng
        </button>
      </div>
      <div className="card-body">
        <p><strong>ID:</strong> {clinic.clinicId}</p>
        <p><strong>Tên phòng khám:</strong> {clinic.clinicName}</p>
      </div>
    </div>
  );
}

export default ClinicDetail;
