import React from 'react';
import './Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faYoutube, faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons'

function Footer() {
  return (
    <div className="footer">
      <div className="footer-content">
        <div className='logo'>
          <img src="https://static-tuoitre.tuoitre.vn/tuoitre/web_images/logotuoitrepro-02.svg" alt="Logo" />
          <div className='media'>
            <a href="https://www.youtube.com"><FontAwesomeIcon icon={faYoutube} /></a>
            <a href="https://www.facebook.com"><FontAwesomeIcon icon={faFacebook} /></a>
            <a href="https://www.instagram.com"><FontAwesomeIcon icon={faInstagram} /></a>
          </div>
        </div>
        <div className="contact-info">
          <p>Tổng biên tập: Lê Thế Chữ</p>
          <p>Giấy phép hoạt động báo điện tử tiếng Việt, tiếng Anh Số 561/GP-BTTTT, cấp ngày 25-11-2022.</p>
          <p>Thông tin tòa soạn - Thành Đoàn TP.HCM</p>
        </div>
        <div className='address'>
          <p>Địa chỉ: 60A Hoàng Văn Thụ, P.9, Q.Phú Nhuận, Tp. Hồ Chí Minh</p>
          <p>Hotline: 0918.033.133 - Email: tto@tuoitre.com.vn</p>
          <p>Phòng Quảng Cáo Báo Tuổi Trẻ: 028.39974848</p>
          <p className >
            <a href="#advertise">Liên hệ Quảng cáo</a> | <a href="#privacy">Điều khoản bảo mật</a> | <a href="#feedback">Liên hệ góp ý</a>
          </p>
        </div>
        <div className="email-signup">
          <p>Đăng ký email - Mở cổng thông tin</p>
          <p>Luôn cập nhật tin tức, sự kiện mới nhất</p>
          <button className="signup-button">Đăng ký tại đây</button>
        </div>
      </div>
    </div>
  );
}

export default Footer;
