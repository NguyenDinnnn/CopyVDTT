import React, { useState } from 'react';
import ServicesForm from './ServicesForm';
import './Services.css';

const ServicesList = () => {
  const [activeFilters, setActiveFilters] = useState({
    active: true,
    inactive: true
  });
  
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);  // Kiểm soát việc hiển thị form thêm dịch vụ
  const [showEditForm, setShowEditForm] = useState(false);  // Kiểm soát việc hiển thị form chỉnh sửa
  const [editingService, setEditingService] = useState(null); // Dữ liệu dịch vụ đang chỉnh sửa
  const [services, setServices] = useState([
    {
      id: 1,
      name: 'Chụp CT phổi liều thấp',
      department: 'Hô Hấp',
      doctor: 'BS.Đỗ Thị Hiền Lương',
      price: '1,000,000 đ',
      duration: '20 phút',
      isActive: true
    }
  ]);

  const handleFilterChange = (filterType) => {
    setActiveFilters(prev => ({
      ...prev,
      [filterType]: !prev[filterType]
    }));
  };

  // Mở form thêm dịch vụ
  const handleAddService = () => {
    setShowAddForm(true);  // Hiển thị form thêm dịch vụ khi nhấn nút
    setShowEditForm(false); // Đảm bảo không hiển thị form chỉnh sửa khi thêm
    setEditingService(null); // Xóa thông tin dịch vụ đang chỉnh sửa
  };

  // Đóng form thêm hoặc chỉnh sửa
  const handleCloseForm = () => {
    setShowAddForm(false);  // Ẩn form thêm dịch vụ khi đóng
    setShowEditForm(false); // Ẩn form chỉnh sửa khi đóng
    setEditingService(null); // Xóa thông tin dịch vụ đang chỉnh sửa
  };

  // Xử lý khi form thêm hoặc chỉnh sửa được gửi
  const handleSubmitForm = (formData) => {
    if (editingService) {
      // Nếu đang chỉnh sửa, cập nhật dịch vụ
      setServices(prev =>
        prev.map(service =>
          service.id === editingService.id ? { ...service, ...formData } : service
        )
      );
    } else {
      // Nếu đang thêm, thêm dịch vụ mới vào danh sách
      const newId = Math.max(...services.map(s => s.id), 0) + 1;
      const newService = {
        id: newId,
        name: formData.name,
        department: formData.department,
        doctor: formData.doctor,
        price: formData.price + ' đ',
        duration: formData.duration + ' phút',
        isActive: true
      };
      setServices(prev => [...prev, newService]);
    }

    handleCloseForm();  // Đóng form sau khi hoàn tất
  };

  // Xem chi tiết dịch vụ
  const handleViewService = (id) => {
    console.log('Xem chi tiết dịch vụ:', id);
  };

  // Chỉnh sửa dịch vụ
  const handleEditService = (id) => {
    const serviceToEdit = services.find(service => service.id === id);
    setEditingService(serviceToEdit); // Lấy dịch vụ cần chỉnh sửa
    setShowEditForm(true); // Hiển thị form chỉnh sửa
    setShowAddForm(false); // Ẩn form thêm dịch vụ
  };

  // Xóa dịch vụ
  const handleDeleteService = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa dịch vụ này?')) {
      setServices(prev => prev.filter(service => service.id !== id));
    }
  };

  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.doctor.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = (activeFilters.active && service.isActive) || 
                         (activeFilters.inactive && !service.isActive);
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="services-list-container">
      <div className="services-header">
        <div className="filter-section">
          <label className="filter-checkbox">
            <input
              type="checkbox"
              checked={activeFilters.active}
              onChange={() => handleFilterChange('active')}
            />
            <span className="checkmark"></span>
            Đang hoạt động
          </label>
          <label className="filter-checkbox">
            <input
              type="checkbox"
              checked={activeFilters.inactive}
              onChange={() => handleFilterChange('inactive')}
            />
            <span className="checkmark"></span>
            Không hoạt động
          </label>
        </div>

        <div className="search-section">
          <div className="search-container">
            <input
              type="text"
              placeholder="Tìm kiếm dịch vụ..."
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
        <button className="add-service-btn" onClick={handleAddService}>
          Thêm dịch vụ khám
        </button>
      </div>

      <div className="services-table-container">
        <table className="services-table">
          <thead>
            <tr>
              <th>STT</th>
              <th>Tên dịch vụ khám</th>
              <th>Chuyên khoa</th>
              <th>Bác sĩ phụ trách</th>
              <th>Chi phí</th>
              <th>Thời gian</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {filteredServices.length > 0 ? (
              filteredServices.map((service, index) => (
                <tr key={service.id}>
                  <td>{index + 1}</td>
                  <td>{service.name}</td>
                  <td>{service.department}</td>
                  <td>{service.doctor}</td>
                  <td>{service.price}</td>
                  <td>{service.duration}</td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="action-btn view-btn"
                        onClick={() => handleViewService(service.id)}
                        title="Xem chi tiết"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="10"></circle>
                          <path d="M12 16v-4M12 8h.01"></path>
                        </svg>
                      </button>
                      <button 
                        className="action-btn edit-btn"
                        onClick={() => handleEditService(service.id)}
                        title="Chỉnh sửa"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                        </svg>
                      </button>
                      <button 
                        className="action-btn delete-btn"
                        onClick={() => handleDeleteService(service.id)}
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
        <ServicesForm 
          onClose={handleCloseForm}
          onSubmit={handleSubmitForm}
        />
      )}

      {showEditForm && (
        <ServicesForm 
          onClose={handleCloseForm}
          onSubmit={handleSubmitForm}
          editingService={editingService}
        />
      )}
    </div>
  );
};

export default ServicesList;
