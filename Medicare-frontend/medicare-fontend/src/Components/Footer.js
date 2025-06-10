import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import '../style/Footer.css';

const Footer = () => {
  return (
    <footer className="footer-bar custom-footer">
      <div className="footer-left">Hiển thị <b>100</b> kết quả</div>
      <div className="footer-right">
        <select className="footer-select">
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
        <span className="footer-range" >Từ 1 đến 10 bản ghi</span>
        <button className="footer-page-btn">
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <button className="footer-page-btn">
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
    </footer>
  );
};

export default Footer;
