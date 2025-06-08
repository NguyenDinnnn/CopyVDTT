import React, { useEffect, useState } from 'react';
import { getSpecialties, createSpecialty, updateSpecialty, deleteSpecialty } from '../../api/SpecialtyApi';
import SpecialtyForm from './SpecialtyForm';
import SpecialtyDetail from './SpecialtyDetail';

function SpecialtyList() {
  const [specialties, setSpecialties] = useState([]);
  const [editingSpecialty, setEditingSpecialty] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedSpecialty, setSelectedSpecialty] = useState(null);

  const fetchData = async () => {
    const res = await getSpecialties();
    setSpecialties(res.data);
  };

  useEffect(() => { fetchData(); }, []);

  const handleSave = async (specialty) => {
    if (specialty.specialtyId) {
      await updateSpecialty(specialty.specialtyId, specialty);
    } else {
      await createSpecialty(specialty);
    }
    setShowForm(false);
    setEditingSpecialty(null);
    fetchData();
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-3">Chuyên khoa</h3>

      <button
        className="btn btn-primary mb-3"
        onClick={() => { setShowForm(true); setEditingSpecialty(null); }}
      >
        + Thêm chuyên khoa
      </button>

      {showForm && (
        <SpecialtyForm
          specialty={editingSpecialty}
          onSave={handleSave}
          onCancel={() => setShowForm(false)}
        />
      )}

      {selectedSpecialty && (
        <SpecialtyDetail
          specialty={selectedSpecialty}
          onClose={() => setSelectedSpecialty(null)}
        />
      )}

      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Tên chuyên khoa</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {specialties.map(s => (
            <tr key={s.specialtyId}>
              <td>{s.specialtyId}</td>
              <td>{s.specialtyName}</td>
              <td>
                <button
                  className="btn btn-info btn-sm me-2"
                  onClick={() => setSelectedSpecialty(s)}
                >
                  Xem
                </button>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => { setEditingSpecialty(s); setShowForm(true); }}
                >
                  Sửa
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={async () => {
                    if (!window.confirm(`Bạn có chắc muốn xóa chuyên khoa "${s.specialtyName}" không?`)) return;

                    try {
                      await deleteSpecialty(s.specialtyId);
                      await fetchData();
                    } catch (err) {
                      console.error("Lỗi khi xóa:", err);
                      alert("Không thể xóa chuyên khoa.");
                    }
                  }}
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SpecialtyList;
