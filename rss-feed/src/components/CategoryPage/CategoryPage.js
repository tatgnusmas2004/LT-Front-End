import React, { useState, useEffect } from 'react';
import Card from '../Card/Card.js';
import ReactPaginate from 'react-paginate';
import './CategoryPage.css';

const CategoryPage = ({ articles }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const articlesPerPage = 6;

  useEffect(() => {
    setCurrentPage(0);
  }, [articles]);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  const offset = currentPage * articlesPerPage;
  const currentArticles = articles.slice(offset, offset + articlesPerPage);

  return (
    <div className='mt-4'>
      {currentArticles.map((item, i) => (
        <Card
          key={i}
          content={item.content}
          contentSnippet={item.contentSnippet}
          title={item.title}
          link={item.link}
          date={item.pubDate}
        />
      ))}
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
    </div>
  );
};

export default CategoryPage;
