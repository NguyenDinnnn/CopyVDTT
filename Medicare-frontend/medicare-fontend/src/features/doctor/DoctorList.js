import React, { useEffect, useState } from 'react';
import { getAllDoctors, deleteDoctor } from '../../api/DoctorApi'; // Thêm deleteDoctor
import DoctorForm from './DoctorForm';

function DoctorList() {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formMode, setFormMode] = useState('edit'); // hoặc 'view'

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await getAllDoctors();
      setDoctors(response.data);
    } catch (error) {
      console.error('Lỗi lấy danh sách bác sĩ:', error);
    }
  };

  const handleAdd = () => {
    setSelectedDoctor(null);
    setFormMode('edit');
    setShowForm(true);
  };

  const handleEdit = (doctor) => {
    setSelectedDoctor(doctor);
    setFormMode('edit');
    setShowForm(true);
  };

  const handleView = (doctor) => {
    setSelectedDoctor(doctor);
    setFormMode('view');
    setShowForm(true);
  };

  const handleDelete = async (doctorId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa bác sĩ này không?')) {
      try {
        await deleteDoctor(doctorId);
        fetchDoctors();
      } catch (error) {
        console.error('Lỗi xóa bác sĩ:', error);
      }
    }
  };

  const handleSave = () => {
    setShowForm(false);
    fetchDoctors();
  };

  const handleCancel = () => {
    setShowForm(false);
  };

  return (
    <div className="container mt-4">
      <h3>Danh sách bác sĩ</h3>
      <button className="btn btn-primary mb-3" onClick={handleAdd}>+ Thêm bác sĩ</button>

      {showForm && (
        <DoctorForm
          doctor={selectedDoctor}
          onSave={handleSave}
          onCancel={handleCancel}
          isView={formMode === 'view'} // Truyền props isView
        />
      )}

      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>Họ tên</th>
            <th>Chuyên khoa</th>
            <th>Năm kinh nghiệm</th>
            <th>Avatar</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map((doctor) => (
            <tr key={doctor.doctorId}>
              <td>{doctor.fullName}</td>
              <td>{doctor.specialtyId}</td>
              <td>{doctor.yearsOfExperience}</td>
              <td>
                {doctor.avatar ? (
                  <img src={doctor.avatar} alt="avatar" width={50} height={50} />
                ) : 'Không có ảnh'}
              </td>
              <td>
                <button className="btn btn-info btn-sm me-1" onClick={() => handleView(doctor)}>Chi tiết</button>
                <button className="btn btn-warning btn-sm me-1" onClick={() => handleEdit(doctor)}>Sửa</button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(doctor.doctorId)}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DoctorList;
