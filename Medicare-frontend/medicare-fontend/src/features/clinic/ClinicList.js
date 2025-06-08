import React, { useEffect, useState } from 'react';
import {
  getClinics,
  createClinic,
  updateClinic,
  deleteClinic,
} from '../../api/ClinicApi';

import ClinicForm from './ClinicForm';
import ClinicDetail from './ClinicDetail';

function ClinicList() {
  const [clinics, setClinics] = useState([]);
  const [loading, setLoading] = useState(false);

  const [editingClinic, setEditingClinic] = useState(null);  // để truyền cho form khi sửa
  const [showForm, setShowForm] = useState(false);

  const [selectedClinic, setSelectedClinic] = useState(null); // để xem chi tiết

  // Lấy danh sách phòng khám
  const fetchClinics = async () => {
    setLoading(true);
    try {
      const res = await getClinics();
      setClinics(res.data);
    } catch (err) {
      alert('Không tải được danh sách phòng khám.');
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchClinics();
  }, []);

  // Xử lý thêm hoặc sửa phòng khám
  const handleSave = async (clinic) => {
    try {
      if (clinic.clinicId) {
        // Sửa
        await updateClinic(clinic.clinicId, clinic);
        alert('Cập nhật phòng khám thành công');
      } else {
        // Thêm mới
        await createClinic(clinic);
        alert('Thêm phòng khám thành công');
      }
      setShowForm(false);
      setEditingClinic(null);
      fetchClinics();
    } catch (err) {
      alert('Lỗi khi lưu phòng khám');
      console.error(err);
    }
  };

  // Xóa phòng khám
  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc muốn xóa phòng khám này?')) {
      try {
        await deleteClinic(id);
        alert('Xóa phòng khám thành công');
        fetchClinics();
      } catch (err) {
        alert('Lỗi khi xóa phòng khám');
        console.error(err);
      }
    }
  };

  // Mở form thêm mới
  const handleAddNew = () => {
    setEditingClinic(null);
    setShowForm(true);
    setSelectedClinic(null);
  };

  // Mở form sửa
  const handleEdit = (clinic) => {
    setEditingClinic(clinic);
    setShowForm(true);
    setSelectedClinic(null);
  };

  // Xem chi tiết
  const handleView = (clinic) => {
    setSelectedClinic(clinic);
    setShowForm(false);
    setEditingClinic(null);
  };

  return (
    <div>
      <h2 className="mb-3">Quản lý Phòng khám</h2>

      <button className="btn btn-success mb-3" onClick={handleAddNew}>
        Thêm mới phòng khám
      </button>

      {showForm && (
        <ClinicForm
          clinic={editingClinic}
          onSave={handleSave}
          onCancel={() => setShowForm(false)}
        />
      )}

      {selectedClinic && (
        <ClinicDetail
          clinic={selectedClinic}
          onClose={() => setSelectedClinic(null)}
        />
      )}

      {loading ? (
        <p>Đang tải dữ liệu...</p>
      ) : (
        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Tên phòng khám</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {clinics.map((clinic) => (
              <tr key={clinic.clinicId}>
                <td>{clinic.clinicId}</td>
                <td>{clinic.clinicName}</td>
                <td>
                  <button
                    className="btn btn-info btn-sm me-2"
                    onClick={() => handleView(clinic)}
                  >
                    Xem
                  </button>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => handleEdit(clinic)}
                  >
                    Sửa
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(clinic.clinicId)}
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ClinicList;
