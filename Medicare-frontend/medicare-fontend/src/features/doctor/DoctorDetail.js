import React from 'react';

function DoctorDetail({ doctor, onClose }) {
  return (
    <div className="card p-3 mb-4">
      <h5>Chi tiết Bác sĩ</h5>
      {doctor.avatar && (
        <img src={doctor.avatar} alt="avatar" className="mb-2" width="100" height="100" />
      )}
      <p><strong>Họ tên:</strong> {doctor.fullName}</p>
      <p><strong>Ngày sinh:</strong> {doctor.dateOfBirth?.substring(0, 10)}</p>
      <p><strong>Giới tính:</strong> {doctor.gender}</p>
      <p><strong>SĐT:</strong> {doctor.phoneNumber}</p>
      <p><strong>Email:</strong> {doctor.email || 'Không có'}</p>
      <p><strong>Chuyên khoa ID:</strong> {doctor.specialtyId}</p>
      <p><strong>Bằng cấp:</strong> {doctor.qualification}</p>
      <p><strong>Kinh nghiệm:</strong> {doctor.yearsOfExperience} năm</p>
      <p><strong>Tiểu sử:</strong> {doctor.bio || 'Không có'}</p>
      <button className="btn btn-secondary mt-2" onClick={onClose}>Đóng</button>
    </div>
  );
}
export default DoctorDetail;
