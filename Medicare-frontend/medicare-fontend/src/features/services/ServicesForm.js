import React, { useState, useEffect } from 'react';
import './ServicesForm.css';

const ServicesForm = ({ onClose, onSubmit, editingService = null }) => {
  const [formData, setFormData] = useState({
    name: '',
    department: '',
    doctor: '',
    price: '',
    duration: '',
    description: '',
    image: null,
    imageName: null
  });

  const [errors, setErrors] = useState({});

  // Populate form data khi edit
  useEffect(() => {
    if (editingService) {
      setFormData({
        name: editingService.name || '',
        department: editingService.department || '',
        doctor: editingService.doctor || '',
        price: editingService.price ? editingService.price.replace(' đ', '') : '',
        duration: editingService.duration ? editingService.duration.replace(' phút', '') : '',
        description: editingService.description || '',
        image: editingService.image || null,
        imageName: editingService.imageName || null
      });
    }
  }, [editingService]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Special handling for price and duration fields
    if (name === 'price') {
      // Only allow numbers and commas
      const numericValue = value.replace(/[^\d,]/g, '');
      setFormData(prev => ({
        ...prev,
        [name]: numericValue
      }));
    } else if (name === 'duration') {
      // Only allow numbers
      const numericValue = value.replace(/\D/g, '');
      setFormData(prev => ({
        ...prev,
        [name]: numericValue
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const allowedTypes = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif'];
      if (!allowedTypes.includes(file.type)) {
        setErrors(prev => ({
          ...prev,
          image: 'Chỉ chấp nhận file PNG, JPG, JPEG hoặc GIF'
        }));
        return;
      }

      // Validate file size (max 5MB)
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        setErrors(prev => ({
          ...prev,
          image: 'Kích thước file không được vượt quá 5MB'
        }));
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData(prev => ({
          ...prev,
          image: event.target.result,
          imageName: file.name
        }));
        // Clear image error if exists
        if (errors.image) {
          setErrors(prev => ({
            ...prev,
            image: ''
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setFormData(prev => ({
      ...prev,
      image: null,
      imageName: null
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Validate service name
    if (!formData.name.trim()) {
      newErrors.name = 'Tên dịch vụ khám là bắt buộc';
    } else if (formData.name.trim().length < 3) {
      newErrors.name = 'Tên dịch vụ phải có ít nhất 3 ký tự';
    } else if (formData.name.trim().length > 100) {
      newErrors.name = 'Tên dịch vụ không được vượt quá 100 ký tự';
    }
    
    // Validate department
    if (!formData.department) {
      newErrors.department = 'Chuyên khoa là bắt buộc';
    }
    
    // Validate doctor
    if (!formData.doctor) {
      newErrors.doctor = 'Bác sĩ phụ trách là bắt buộc';
    }
    
    // Validate price
    if (!formData.price.trim()) {
      newErrors.price = 'Chi phí dịch vụ là bắt buộc';
    } else {
      const priceNumber = parseFloat(formData.price.replace(/,/g, ''));
      if (isNaN(priceNumber) || priceNumber <= 0) {
        newErrors.price = 'Chi phí phải là số dương hợp lệ';
      } else if (priceNumber > 100000000) { // 100 triệu
        newErrors.price = 'Chi phí không được vượt quá 100,000,000 VNĐ';
      }
    }
    
    // Validate duration
    if (!formData.duration.trim()) {
      newErrors.duration = 'Thời gian thực hiện là bắt buộc';
    } else {
      const durationNumber = parseInt(formData.duration);
      if (isNaN(durationNumber) || durationNumber <= 0) {
        newErrors.duration = 'Thời gian phải là số dương hợp lệ';
      } else if (durationNumber > 480) { // 8 hours
        newErrors.duration = 'Thời gian không được vượt quá 480 phút (8 giờ)';
      }
    }

    // Validate description length
    if (formData.description && formData.description.length > 500) {
      newErrors.description = 'Mô tả không được vượt quá 500 ký tự';
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
          <h2>{editingService ? 'SỬA DỊCH VỤ KHÁM' : 'THÊM DỊCH VỤ KHÁM'}</h2>
          <button className="close-btn" onClick={onClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <form className="services-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">
              Tên dịch vụ khám: <span className="required">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Ví dụ: Khám da liễu"
              value={formData.name}
              onChange={handleInputChange}
              className={errors.name ? 'error' : ''}
              maxLength="100"
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
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
              <label htmlFor="doctor">
                Bác sĩ phụ trách: <span className="required">*</span>
              </label>
              <select
                id="doctor"
                name="doctor"
                value={formData.doctor}
                onChange={handleInputChange}
                className={errors.doctor ? 'error' : ''}
              >
                <option value="">-- Chọn bác sĩ --</option>
                <option value="BS.Đỗ Thị Hiền Lương">BS.Đỗ Thị Hiền Lương</option>
                <option value="BS.Nguyễn Văn An">BS.Nguyễn Văn An</option>
                <option value="BS.Trần Thị Bình">BS.Trần Thị Bình</option>
                <option value="BS.Lê Minh Cường">BS.Lê Minh Cường</option>
                <option value="BS.Phạm Thị Dung">BS.Phạm Thị Dung</option>
              </select>
              {errors.doctor && <span className="error-message">{errors.doctor}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="price">
                Chi phí dịch vụ (VNĐ): <span className="required">*</span>
              </label>
              <input
                type="text"
                id="price"
                name="price"
                placeholder="Ví dụ: 500,000"
                value={formData.price}
                onChange={handleInputChange}
                className={errors.price ? 'error' : ''}
              />
              {errors.price && <span className="error-message">{errors.price}</span>}
              <div className="input-hint">Chi phí dịch vụ được chỉ rõ bằng số và dấu phẩy phân tách hàng nghìn</div>
            </div>

            <div className="form-group">
              <label htmlFor="duration">
                Thời gian thực hiện (phút): <span className="required">*</span>
              </label>
              <input
                type="text"
                id="duration"
                name="duration"
                placeholder="Ví dụ: 30"
                value={formData.duration}
                onChange={handleInputChange}
                className={errors.duration ? 'error' : ''}
              />
              {errors.duration && <span className="error-message">{errors.duration}</span>}
              <div className="input-hint">Thời gian thực hiện phải từ 15 đến 120 phút và chỉ chứa số</div>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="description">Mô tả dịch vụ:</label>
            <textarea
              id="description"
              name="description"
              placeholder="Nhập mô tả chi tiết về dịch vụ khám (tối đa 500 ký tự)"
              value={formData.description}
              onChange={handleInputChange}
              maxLength="500"
              rows="4"
              className={errors.description ? 'error' : ''}
            />
            {errors.description && <span className="error-message">{errors.description}</span>}
            <div className="character-count">
              {formData.description.length}/500
            </div>
          </div>

          <div className="form-group">
            <label>Ảnh minh họa:</label>
            {errors.image && <span className="error-message">{errors.image}</span>}
            <div className="image-upload-container">
              {formData.image ? (
                <>
                  <div className="image-preview-section">
                    <img src={formData.image} alt="Preview" className="preview-image" />
                  </div>
                  
                  <input
                    type="file"
                    id="image-change"
                    accept="image/png,image/jpg,image/gif,image/jpeg"
                    onChange={handleImageUpload}
                    style={{ display: 'none' }}
                  />
                  <label htmlFor="image-change" className="image-change-area">
                    <div className="change-placeholder">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="7,10 12,15 17,10"></polyline>
                        <line x1="12" y1="15" x2="12" y2="3"></line>
                      </svg>
                      <p>Thay đổi ảnh minh họa</p>
                      <span>PNG, JPG, GIF (tối đa 5MB)</span>
                    </div>
                  </label>
                  
                  <div className="selected-file">
                    <div className="file-info">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14,2 14,8 20,8"></polyline>
                        <line x1="16" y1="13" x2="8" y2="13"></line>
                        <line x1="16" y1="17" x2="8" y2="17"></line>
                        <polyline points="10,9 9,9 8,9"></polyline>
                      </svg>
                      <span>{formData.imageName}</span>
                    </div>
                    <button type="button" className="remove-file-btn" onClick={handleRemoveImage}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <input
                    type="file"
                    id="image-upload"
                    accept="image/png,image/jpg,image/gif,image/jpeg"
                    onChange={handleImageUpload}
                    style={{ display: 'none' }}
                  />
                  <label htmlFor="image-upload" className="image-upload-area">
                    <div className="upload-placeholder">
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="7,10 12,15 17,10"></polyline>
                        <line x1="12" y1="15" x2="12" y2="3"></line>
                      </svg>
                      <p>Nhấp để chọn ảnh hoặc kéo thả tại đây</p>
                      <span>PNG, JPG, GIF (tối đa 5MB)</span>
                    </div>
                  </label>
                </>
              )}
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="submit-btn">
              {editingService ? 'Cập nhật' : 'Xác nhận'}
            </button>
            <button type="button" className="cancel-btn" onClick={handleCancel}>
              Hủy bỏ
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ServicesForm;