import { useState, useEffect } from 'react';
import axios from 'axios';

const useArticles = (feedURLs) => {
  const [articles, setArticles] = useState({});

  const getArticles = async () => {
    try {
      const res = await axios.get('http://localhost:4000/');
      const groupedArticles = res.data.reduce((acc, article) => {
        const feedURL = feedURLs.find(feed => article.category === feed.url);
        if (feedURL) {
          if (!acc[feedURL.title]) {
            acc[feedURL.title] = [];
          }
          acc[feedURL.title].push(article);
        }
        return acc;
      }, {});
      setArticles(groupedArticles);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getArticles();
  }, []);

  return articles;
};

export default useArticles;
