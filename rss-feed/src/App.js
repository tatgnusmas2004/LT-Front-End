import React, { useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Navbar from './components/Navbar/Navbar';
import CategoryPage from './components/CategoryPage/CategoryPage';
import useArticles from './components/hooks/useArticles';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import DetailPage from './components/DetailPage/DetailPage';
import ThemeToggle from './components/ThemeToggle/ThemeToggle';
import SearchArticle from './components/SearchArticle/SearchArticle';
import ScrollToTopButton from './components/ScrollToTopButton/ScrollToTopButton';

const feedURLs = [
  { title: 'Trang chủ', url: 'https://tuoitre.vn/rss/tin-moi-nhat.rss' },
  { title: 'Thế giới', url: 'https://tuoitre.vn/rss/the-gioi.rss' },
  { title: 'Kinh doanh', url: 'https://tuoitre.vn/rss/kinh-doanh.rss' },
  { title: 'Xe', url: 'https://tuoitre.vn/rss/xe.rss' },
  { title: 'Văn Hóa', url: 'https://tuoitre.vn/rss/van-hoa.rss' },
  { title: 'Thể thao', url: 'https://tuoitre.vn/rss/the-thao.rss' },
  { title: 'Khoa học', url: 'https://tuoitre.vn/rss/khoa-hoc.rss' },
  { title: 'Giả thật', url: 'https://tuoitre.vn/rss/gia-that.rss' },
  { title: 'Bạn đọc làm báo', url: 'https://tuoitre.vn/rss/ban-doc-lam-bao.rss' },
  { title: 'Pháp luật', url: 'https://tuoitre.vn/rss/phap-luat.rss' },
  { title: 'Công nghệ', url: 'https://tuoitre.vn/rss/cong-nghe.rss' },
  { title: 'Nhịp sống trẻ', url: 'https://tuoitre.vn/rss/nhip-song-tre.rss' },
  { title: 'Giải trí', url: 'https://tuoitre.vn/rss/giai-tri.rss' },
  { title: 'Giáo dục', url: 'https://tuoitre.vn/rss/giao-duc.rss' },
  { title: 'Sức khỏe', url: 'https://tuoitre.vn/rss/suc-khoe.rss' },
  { title: 'Thư giản', url: 'https://tuoitre.vn/rss/thu-gian.rss' },
  { title: 'Du lịch', url: 'https://tuoitre.vn/rss/du-lich.rss' },
];

function App() {
  const [selectedCategory, setSelectedCategory] = useState('Trang chủ');
  const articles = useArticles(feedURLs);

  return (
    <div>
      <BrowserRouter>
        <Header />
        <Navbar feedURLs={feedURLs} setSelectedCategory={setSelectedCategory} />
        <Routes>
          <Route path="/:category" element={<CategoryPage articles={articles[selectedCategory] || []} />} />
          <Route path="/" element={<Navigate to="/Trang chủ" replace />} />
          <Route path="/article" element={<DetailPage />} />
          <Route path="/search" element={<SearchArticle />} />
        </Routes>
      </BrowserRouter>
      <ThemeToggle />
      <ScrollToTopButton />
      <Footer />
    </div>
  );
}

export default App;