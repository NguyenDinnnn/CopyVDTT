import React, { useState, useEffect } from 'react';
import './DoctorForm.css';

const DoctorForm = ({ onClose, onSubmit, editingDoctor = null }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    doctorCode: '',
    dateOfBirth: '',
    gender: 'Nam',
    department: '',
    qualification: '',
    email: '',
    phoneNumber: '',
    note: ''
  });

  const [errors, setErrors] = useState({});

  // Populate form data khi edit
  useEffect(() => {
    if (editingDoctor) {
      setFormData({
        fullName: editingDoctor.fullName || '',
        doctorCode: editingDoctor.doctorCode || '',
        dateOfBirth: editingDoctor.dateOfBirth || '',
        gender: editingDoctor.gender || 'Nam',
        department: editingDoctor.department || '',
        qualification: editingDoctor.qualification || '',
        email: editingDoctor.email || '',
        phoneNumber: editingDoctor.phoneNumber || '',
        note: editingDoctor.note || ''
      });
    }
  }, [editingDoctor]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Họ và tên là bắt buộc';
    } else if (formData.fullName.trim().length < 3) {
      newErrors.fullName = 'Họ và tên phải có ít nhất 3 ký tự';
    }
    
    if (!formData.doctorCode.trim()) {
      newErrors.doctorCode = 'Mã bác sĩ là bắt buộc';
    }
    
    if (!formData.dateOfBirth.trim()) {
      newErrors.dateOfBirth = 'Ngày sinh là bắt buộc';
    }
    
    if (!formData.department) {
      newErrors.department = 'Chuyên khoa là bắt buộc';
    }
    
    if (!formData.qualification) {
      newErrors.qualification = 'Trình độ chuyên môn là bắt buộc';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email là bắt buộc';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ';
    }
    
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Số điện thoại là bắt buộc';
    } else if (!/^\d{10}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Số điện thoại phải là 10 chữ số';
    }
    
    if (formData.note && formData.note.length > 500) {
      newErrors.note = 'Ghi chú không được vượt quá 500 ký tự';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
      onClose();
    }
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-container">
        <div className="modal-header">
          <h2>{editingDoctor ? 'SỬA THÔNG TIN BÁC SĨ' : 'THÊM BÁC SĨ'}</h2>
          <button className="close-btn" onClick={onClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <form className="doctor-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="fullName">
              Họ và tên: <span className="required">*</span>
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              placeholder="Ví dụ: Nguyễn Văn A"
              value={formData.fullName}
              onChange={handleInputChange}
              className={errors.fullName ? 'error' : ''}
            />
            {errors.fullName && <span className="error-message">{errors.fullName}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="doctorCode">
              Mã bác sĩ: <span className="required">*</span>
            </label>
            <input
              type="text"
              id="doctorCode"
              name="doctorCode"
              placeholder="Ví dụ: BS001"
              value={formData.doctorCode}
              onChange={handleInputChange}
              className={errors.doctorCode ? 'error' : ''}
            />
            {errors.doctorCode && <span className="error-message">{errors.doctorCode}</span>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="dateOfBirth">
                Ngày sinh: <span className="required">*</span>
              </label>
              <input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                className={errors.dateOfBirth ? 'error' : ''}
              />
              {errors.dateOfBirth && <span className="error-message">{errors.dateOfBirth}</span>}
            </div>

            <div className="form-group">
              <label>Giới tính: <span className="required">*</span></label>
              <div className="radio-group">
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="Nam"
                    checked={formData.gender === 'Nam'}
                    onChange={handleInputChange}
                  /> Nam
                </label>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="Nữ"
                    checked={formData.gender === 'Nữ'}
                    onChange={handleInputChange}
                  /> Nữ
                </label>
              </div>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="department">
                Chuyên khoa: <span className="required">*</span>
              </label>
              <select
                id="department"
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                className={errors.department ? 'error' : ''}
              >
                <option value="">-- Chọn chuyên khoa --</option>
                <option value="Hô Hấp">Hô Hấp</option>
                <option value="Tim Mạch">Tim Mạch</option>
                <option value="Da Liễu">Da Liễu</option>
                <option value="Nội Khoa">Nội Khoa</option>
                <option value="Ngoại Khoa">Ngoại Khoa</option>
                <option value="Sản Phụ Khoa">Sản Phụ Khoa</option>
                <option value="Nhi Khoa">Nhi Khoa</option>
                <option value="Mắt">Mắt</option>
                <option value="Tai Mũi Họng">Tai Mũi Họng</option>
              </select>
              {errors.department && <span className="error-message">{errors.department}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="qualification">
                Trình độ chuyên môn: <span className="required">*</span>
              </label>
              <select
                id="qualification"
                name="qualification"
                value={formData.qualification}
                onChange={handleInputChange}
                className={errors.qualification ? 'error' : ''}
              >
                <option value="">-- Chọn trình độ --</option>
                <option value="Tiến sĩ">Tiến sĩ</option>
                <option value="Thạc sĩ">Thạc sĩ</option>
                <option value="Bác sĩ CKII">Bác sĩ CKII</option>
                <option value="Bác sĩ CKI">Bác sĩ CKI</option>
              </select>
              {errors.qualification && <span className="error-message">{errors.qualification}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="email">
                Email: <span className="required">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Ví dụ: nguvenvana@medicare.vn"
                value={formData.email}
                onChange={handleInputChange}
                className={errors.email ? 'error' : ''}
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="phoneNumber">
                Số điện thoại: <span className="required">*</span>
              </label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                placeholder="Ví dụ: 0123456789"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className={errors.phoneNumber ? 'error' : ''}
              />
              {errors.phoneNumber && <span className="error-message">{errors.phoneNumber}</span>}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="note">Ghi chú:</label>
            <textarea
              id="note"
              name="note"
              placeholder="Nhập ghi chú (tối đa 500 ký tự)"
              value={formData.note}
              onChange={handleInputChange}
              maxLength="500"
              rows="4"
              className={errors.note ? 'error' : ''}
            />
            {errors.note && <span className="error-message">{errors.note}</span>}
            <div className="character-count">
              {formData.note.length}/500
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="submit-btn">Xác nhận</button>
            <button type="button" className="cancel-btn" onClick={handleCancel}>Hủy bỏ</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DoctorForm;