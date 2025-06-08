import React from 'react';

function SpecialtyDetail({ specialty, onClose }) {
  return (
    <div>
      <h4>Chi tiết Chuyên khoa</h4>
      <p>ID: {specialty.specialtyId}</p>
      <p>Tên: {specialty.specialtyName}</p>
      <button onClick={onClose}>Đóng</button>
    </div>
  );
}
export default SpecialtyDetail;
