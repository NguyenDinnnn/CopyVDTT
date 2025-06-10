import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAppointments, deleteAppointment } from "../../api/AppointmentApi";
import Header from "../../Components/Header";
import '../../style/AppointmentList.css'; // đã chứa đầy đủ cả style filter

const AppointmentList = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterValue, setFilterValue] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const data = await getAppointments();
      setAppointments(data);
      setError(null);
    } catch (err) {
      setError("Không thể tải danh sách lịch hẹn");
      console.error("Error fetching appointments:", err);
      setAppointments([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa lịch hẹn này?")) {
      try {
        await deleteAppointment(id);
        fetchAppointments();
      } catch (err) {
        setError("Không thể xóa lịch hẹn");
        console.error("Error deleting appointment:", err);
      }
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredAppointments = appointments.filter((appointment) => {
    // Lọc theo checkbox
    const now = new Date();
    let matchFilter = true;
    if (filterValue === "today") {
      const todayStr = new Date().toISOString().split("T")[0];
      matchFilter = appointment.appointmentDate.startsWith(todayStr);
    } else if (filterValue === "upcoming") {
      matchFilter = new Date(appointment.appointmentDate) > now;
    }

    // Lọc theo tìm kiếm
    const keyword = searchTerm.toLowerCase();
    const matchSearch = (
      appointment.patientName?.toLowerCase().includes(keyword) ||
      appointment.roomName?.toLowerCase().includes(keyword) ||
      appointment.serviceName?.toLowerCase().includes(keyword) ||
      appointment.doctorName?.toLowerCase().includes(keyword) ||
      appointment.specialty?.toLowerCase().includes(keyword)
    );

    return matchFilter && matchSearch;
  });

  return (
    <div className="appointment-list-container">
      <Header />

      {/* Bộ lọc và tìm kiếm */}
      <div className="filter-section">
  <div className="filter-checkbox-group">
    <label className="filter-checkbox-label">
      <input
        type="radio"
        name="appointment-filter"
        checked={filterValue === 'today'}
        onChange={() => setFilterValue('today')}
      />
      Chờ xác nhận
    </label>
    <label className="filter-checkbox-label">
      <input
        type="radio"
        name="appointment-filter"
        checked={filterValue === 'upcoming'}
        onChange={() => setFilterValue('upcoming')}
      />
      Đã xác nhận
    </label>
    <label className="filter-checkbox-label">
      <input
        type="radio"
        name="appointment-filter"
        checked={filterValue === 'all'}
        onChange={() => setFilterValue('all')}
      />
      Tất cả
    </label>
  </div>

  <div className="search-box">
    <input
      type="text"
      placeholder="Tìm kiếm..."
      value={searchTerm}
      onChange={handleSearchChange}
    />
  </div>
</div>


      {/* Bảng danh sách */}
      <div className="appointment-table-wrapper">
        {loading ? (
          <div className="loading">Đang tải...</div>
        ) : (
          <table className="appointment-table">
            <thead>
              <tr>
                <th>STT</th>
                <th>Tên bệnh nhân</th>
                <th>Phòng khám</th>
                <th>Tên dịch vụ khám</th>
                <th>Bác sĩ phụ trách</th>
                <th>Chuyên khoa</th>
                <th>Ngày giờ khám</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredAppointments.length > 0 ? (
                filteredAppointments.map((appointment, index) => (
                  <tr key={appointment.id}>
                    <td>{index + 1}</td>
                    <td>{appointment.patientName}</td>
                    <td>{appointment.roomName}</td>
                    <td>{appointment.serviceName}</td>
                    <td>{appointment.doctorName}</td>
                    <td>{appointment.specialty}</td>
                    <td>{new Date(appointment.appointmentDate).toLocaleString()}</td>
                    <td>
                      <div className="action-buttons">
                        <Link to={`/appointments/edit/${appointment.id}`} className="edit-btn">
                          Sửa
                        </Link>
                        <button onClick={() => handleDelete(appointment.id)} className="delete-btn">
                          Xóa
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="empty-row">Không có dữ liệu</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AppointmentList;
