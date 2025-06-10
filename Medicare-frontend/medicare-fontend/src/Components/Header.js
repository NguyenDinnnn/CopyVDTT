import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faChevronDown, faBell, faUser, faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import '../style/Header.css';
import avatar from '../assets/images/avt.jpg';

const Header = () => {
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Đóng dropdown khi click ra ngoài
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Hàm lấy tiêu đề dựa trên đường dẫn hiện tại
  const getPageTitle = (pathname) => {
    switch (pathname) {
      case '/':
        return 'TRANG CHỦ';
      case '/appointments':
        return 'QUẢN LÝ LỊCH HẸN KHÁM';
      case '/doctors':
        return 'QUẢN LÝ THÔNG TIN BÁC SĨ';
      case '/schedule':
        return 'QUẢN LÝ LỊCH LÀM VIỆC';
      case '/services':
        return 'QUẢN LÝ DỊCH VỤ KHÁM';
      case '/patients':
        return 'QUẢN LÝ THÔNG TIN BỆNH NHÂN';
      default:
        return 'QUẢN LÝ DỊCH VỤ KHÁM';
    }
  };

  return (
    <div className="header-container">
      <div className="header-bar">
        {/* Menu 3 gạch trong khung vuông */}
        <div className="header-menu-btn">
          <button className="menu-btn-square">
            <FontAwesomeIcon icon={faBars} />
          </button>
        </div>
        {/* Tiêu đề động */}
        <span className="header-title">{getPageTitle(location.pathname)}</span>
        {/* Right side */}
        <div className="header-right">
          <div className="header-bell">
            <FontAwesomeIcon icon={faBell} className="bell-icon" />
            <span className="notification-dot"></span>
          </div>
          <div className="header-user-wrapper" ref={dropdownRef}>
            <div className="header-user">
              <img src={avatar} alt="User Avatar" className="header-avatar" />
              <div className="header-user-info">
                <span className="header-user-name">Nguyễn Văn A</span>
                <span className="header-user-role">Điều phối viên</span>
              </div>
              <FontAwesomeIcon icon={faChevronDown} className="dropdown-arrow" onClick={() => setDropdownOpen(!dropdownOpen)} style={{ cursor: 'pointer' }} />
            </div>
            {dropdownOpen && (
              <div className="dropdown-menu">
                <div className="dropdown-item">
                  <FontAwesomeIcon icon={faUser} />
                  <span>Thông tin tài khoản</span>
                </div>
                <div className="dropdown-item">
                  <FontAwesomeIcon icon={faCog} />
                  <span>Cài đặt thông báo</span>
                </div>
                <div className="dropdown-item logout">
                  <FontAwesomeIcon icon={faSignOutAlt} />
                  <span>Đăng xuất</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;