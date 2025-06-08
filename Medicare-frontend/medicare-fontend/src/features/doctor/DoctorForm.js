import React, { useState, useEffect } from 'react';
import { createDoctor, updateDoctor } from '../../api/DoctorApi';

function DoctorForm({ doctor, onSave, onCancel, isView = false }) {
  const [form, setForm] = useState({
    fullName: '',
    dateOfBirth: '',
    gender: '',
    phoneNumber: '',
    email: '',
    specialtyId: '',
    qualification: '',
    yearsOfExperience: '',
    avatar: '',
    bio: ''
  });

  useEffect(() => {
    if (doctor) setForm(doctor);
  }, [doctor]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isView) return;

    if (doctor?.doctorId) {
      await updateDoctor(doctor.doctorId, form);
    } else {
      await createDoctor(form);
    }
    onSave();
  };

  const renderInput = (label, name, type = 'text') => {
    let value = form[name] || '';
    if (type === 'date' && value) {
      value = value.substring(0, 10);
    }
    return (
      <div className="mb-2">
        <label>{label}</label>
        <input
          className="form-control"
          type={type}
          name={name}
          value={value}
          onChange={handleChange}
          readOnly={isView}
        />
      </div>
    );
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <h5>{isView ? 'Chi tiết Bác sĩ' : doctor ? 'Cập nhật Bác sĩ' : 'Thêm Bác sĩ mới'}</h5>
      <div className="row">
        <div className="col-md-6">
          {renderInput('Họ tên', 'fullName')}
          {renderInput('Ngày sinh', 'dateOfBirth', 'date')}
          <div className="mb-2">
            <label>Giới tính</label>
            <select className="form-control" name="gender" value={form.gender} onChange={handleChange} disabled={isView}>
              <option value="">-- Chọn giới tính --</option>
              <option value="Nam">Nam</option>
              <option value="Nữ">Nữ</option>
            </select>
          </div>
          {renderInput('SĐT', 'phoneNumber')}
          {renderInput('Email', 'email')}
        </div>
        <div className="col-md-6">
          {renderInput('ID chuyên khoa', 'specialtyId')}
          {renderInput('Bằng cấp', 'qualification')}
          {renderInput('Số năm kinh nghiệm', 'yearsOfExperience')}
          {renderInput('Link avatar', 'avatar')}
          <div className="mb-2">
            <label>Tiểu sử</label>
            <textarea
              className="form-control"
              name="bio"
              value={form.bio || ''}
              onChange={handleChange}
              readOnly={isView}
            />
          </div>
        </div>
      </div>

      {!isView && <button type="submit" className="btn btn-success me-2">Lưu</button>}
      <button type="button" className="btn btn-secondary" onClick={onCancel}>Đóng</button>
    </form>
  );
}

export default DoctorForm;
