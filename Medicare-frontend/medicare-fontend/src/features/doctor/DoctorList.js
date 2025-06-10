import React, { useState } from 'react';
import DoctorForm from './DoctorForm';
import './Test.css';

const DoctorList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);  // Kiểm soát việc hiển thị form thêm bác sĩ
  const [showEditForm, setShowEditForm] = useState(false);  // Kiểm soát việc hiển thị form chỉnh sửa
  const [editingDoctor, setEditingDoctor] = useState(null); // Dữ liệu bác sĩ đang chỉnh sửa
  const [doctors, setDoctors] = useState([
    {
      id: 1,
      fullName: 'Nguyễn Văn A',
      department: 'Nội Khoa',
      qualification: 'Bác sĩ CKI',
      email: 'nguyenvana@medicare.vn',
      phoneNumber: '0324761254',
      isActive: true
    }
  ]);

  // Mở form thêm bác sĩ
  const handleAddDoctor = () => {
    setShowAddForm(true);  // Hiển thị form thêm bác sĩ khi nhấn nút
    setShowEditForm(false); // Đảm bảo không hiển thị form chỉnh sửa khi thêm
    setEditingDoctor(null); // Xóa thông tin bác sĩ đang chỉnh sửa
  };

  // Đóng form thêm hoặc chỉnh sửa
  const handleCloseForm = () => {
    setShowAddForm(false);  // Ẩn form thêm bác sĩ khi đóng
    setShowEditForm(false); // Ẩn form chỉnh sửa khi đóng
    setEditingDoctor(null); // Xóa thông tin bác sĩ đang chỉnh sửa
  };

  // Xử lý khi form thêm hoặc chỉnh sửa được gửi
  const handleSubmitForm = (formData) => {
    if (editingDoctor) {
      // Nếu đang chỉnh sửa, cập nhật bác sĩ
      setDoctors(prev =>
        prev.map(doctor =>
          doctor.id === editingDoctor.id ? { ...doctor, ...formData } : doctor
        )
      );
    } else {
      // Nếu đang thêm, thêm bác sĩ mới vào danh sách
      const newId = Math.max(...doctors.map(d => d.id), 0) + 1;
      const newDoctor = {
        id: newId,
        fullName: formData.fullName,
        department: formData.department,
        qualification: formData.qualification,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        isActive: true
      };
      setDoctors(prev => [...prev, newDoctor]);
    }

    handleCloseForm();  // Đóng form sau khi hoàn tất
  };

  // Xem chi tiết bác sĩ
  const handleViewDoctor = (id) => {
    console.log('Xem chi tiết bác sĩ:', id);
  };

  // Chỉnh sửa bác sĩ
  const handleEditDoctor = (id) => {
    const doctorToEdit = doctors.find(doctor => doctor.id === id);
    setEditingDoctor(doctorToEdit); // Lấy bác sĩ cần chỉnh sửa
    setShowEditForm(true); // Hiển thị form chỉnh sửa
    setShowAddForm(false); // Ẩn form thêm bác sĩ
  };

  // Xóa bác sĩ
  const handleDeleteDoctor = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa bác sĩ này?')) {
      setDoctors(prev => prev.filter(doctor => doctor.id !== id));
    }
  };

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.qualification.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.phoneNumber.includes(searchTerm);
    
    return matchesSearch;
  });

  return (
    <div className="services-list-container">
      <div className="services-header">
        <div className="search-section">
          <div className="search-container">
            <input
              type="text"
              placeholder="Tìm kiếm bác sĩ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <button className="search-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="add-service-section">
        <button className="add-service-btn" onClick={handleAddDoctor}>
          Thêm bác sĩ
        </button>
      </div>

      <div className="services-table-container">
        <table className="services-table">
          <thead>
            <tr>
              <th>STT</th>
              <th>Tên bác sĩ</th>
              <th>Chuyên khoa</th>
              <th>Trình độ chuyên môn</th>
              <th>Email</th>
              <th>Số điện thoại</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {filteredDoctors.length > 0 ? (
              filteredDoctors.map((doctor, index) => (
                <tr key={doctor.id}>
                  <td>{index + 1}</td>
                  <td>{doctor.fullName}</td>
                  <td>{doctor.department}</td>
                  <td>{doctor.qualification}</td>
                  <td>{doctor.email}</td>
                  <td>{doctor.phoneNumber}</td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="action-btn view-btn"
                        onClick={() => handleViewDoctor(doctor.id)}
                        title="Xem chi tiết"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="10"></circle>
                          <path d="M12 16v-4M12 8h.01"></path>
                        </svg>
                      </button>
                      <button 
                        className="action-btn edit-btn"
                        onClick={() => handleEditDoctor(doctor.id)}
                        title="Chỉnh sửa"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                        </svg>
                      </button>
                      <button 
                        className="action-btn delete-btn"
                        onClick={() => handleDeleteDoctor(doctor.id)}
                        title="Xóa"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="3,6 5,6 21,6"></polyline>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="no-data">
                  Không có dữ liệu
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showAddForm && (
        <DoctorForm 
          onClose={handleCloseForm}
          onSubmit={handleSubmitForm}
        />
      )}

      {showEditForm && (
        <DoctorForm 
          onClose={handleCloseForm}
          onSubmit={handleSubmitForm}
          editingDoctor={editingDoctor}
        />
      )}
    </div>
  );
};

export default DoctorList;