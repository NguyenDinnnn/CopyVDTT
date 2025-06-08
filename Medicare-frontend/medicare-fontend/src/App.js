import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';

import ClinicList from './features/clinic/ClinicList';
import SpecialtyList from './features/specialty/SpecialtyList';
import DoctorList from './features/doctor/DoctorList';

function App() {
  return (
    <Router>
      <div className="container mt-3">
        <nav className="mb-4">
          <NavLink to="/clinics" className="btn btn-outline-primary me-2" activeclassname="active">
            Phòng khám
          </NavLink>
          <NavLink to="/specialties" className="btn btn-outline-primary me-2" activeclassname="active">
            Chuyên khoa
          </NavLink>
          <NavLink to="/doctors" className="btn btn-outline-primary" activeclassname="active">
            Bác sĩ
          </NavLink>
        </nav>

        <Routes>
          <Route path="/" element={<ClinicList />} />
          <Route path="/clinics" element={<ClinicList />} />
          <Route path="/specialties" element={<SpecialtyList />} />
          <Route path="/doctors" element={<DoctorList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
