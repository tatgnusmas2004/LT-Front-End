import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ArticleCard from '../Card/Card';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import '../CategoryPage/CategoryPage.css';
import './SearchArticle.css';
import ScrollToTopButton from '../ScrollToTopButton/ScrollToTopButton';

const SearchArticle = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const keyword = query.get('keyword');
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const articlesPerPage = 6;

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`http://localhost:4000/api/search?keyword=${encodeURIComponent(keyword)}`);
        setArticles(response.data);
        setLoading(false);
      } catch (error) {
        setError('Lỗi khi tải bài báo');
        setLoading(false);
      }
    };

    fetchArticles();
  }, [keyword]);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  const offset = currentPage * articlesPerPage;
  const currentArticles = articles.slice(offset, offset + articlesPerPage);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="search-articles">

      <h2>Kết quả tìm kiếm cho: {keyword}</h2>
      {currentArticles.length > 0 ? (
        currentArticles.map(article => (
          <ArticleCard key={article.link} {...article} />
        ))
      ) : (
        <p>Không có kết quả tìm kiếm, vui lòng thử lại.</p>
      )}
      {articles.length > articlesPerPage && (
        <ReactPaginate
          previousLabel={'<'}
          nextLabel={'>'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={Math.ceil(articles.length / articlesPerPage)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={'pagination'}
          activeClassName={'active'}
          forcePage={currentPage}
        />
      )}
      <ScrollToTopButton />
    </div>
  );
};

export default SearchArticle;
