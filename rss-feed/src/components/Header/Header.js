import './Header.css'
import ReactDOM from 'react-dom'
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faUser, faHouse } from '@fortawesome/free-solid-svg-icons'

const Header = () => {

  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (e) => {
    e.preventDefault();
    const keyword = searchTerm
    navigate(`/search?keyword=${encodeURIComponent(keyword)}`);
  };

  useEffect(() => {
    if (!location.pathname.startsWith('/search')) {
      setSearchTerm('');
    }
  }, [location]);

  return (
    <div className="Header">
      <header className="navbar-head">
        <div className="navbar-top-head">
          <a href='index.html'>
            <img src="https://static-tuoitre.tuoitre.vn/tuoitre/web_images/logottonew.svg" alt="Tuoi Tre Online" className="logo" />
          </a>
          <div className="navbar-top-links">
            <a href="#podcast">Podcast</a>
            <a href="#youtube">YouTube</a>
            <a href="#can-biet">Cần biết</a>
            <a href="#rao-vat">Rao vặt</a>
            <form onSubmit={handleSearch} className="search-form">
              <input className='search-box'
                type="text"
                placeholder="Tìm Kiếm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button type="submit" className='search-btn'>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </button>
            </form>
            <button className="btn-subscribe">Đăng ký Tuổi Trẻ Sao</button>
          </div>
        </div>
      </header>
    </div>
  )
}

export default Header;