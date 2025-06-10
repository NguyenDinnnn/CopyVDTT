import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Sidebar from './Components/Sidebar';
import Header from './Components/Header';
import AppointmentList from './features/appointment/AppointmentList';
import DoctorList from './features/doctor/DoctorList';
import './style/Layout.css';
import HomePage from './features/home/HomePage';
import Footer from './Components/Footer';
import ServicesList from './features/services/ServicesList';

const SchedulePage = () => (
  <div className="page-content">
    <h1>Quản lý lịch làm việc</h1>
    <p>Trang quản lý lịch làm việc của các bác sĩ và nhân viên.</p>
  </div>
);
const PatientsPage = () => (
  <div className="page-content">
    <h1>Quản lý thông tin bệnh nhân</h1>
    <p>Trang quản lý thông tin chi tiết của các bệnh nhân.</p>
  </div>
);

//Di chuyển phần layout vào component riêng để sử dụng useLocation
function AppLayout() {
  const location = useLocation(); // Lấy đường dẫn hiện tại

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">
        <Header />
        <div className="content-area">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/appointments" element={<AppointmentList />} />
            <Route path="/doctors" element={<DoctorList />} />
            <Route path="/schedule" element={<SchedulePage />} />
            <Route path="/services" element={<ServicesList />} />
            <Route path="/patients" element={<PatientsPage />} />
          </Routes>
        </div>

        {location.pathname !== '/' && <Footer />}
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;