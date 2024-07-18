import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import classes from './Navbar.css';
import $ from 'jquery'

const Navbar = ({ feedURLs, setSelectedCategory }) => {
  const navigate = useNavigate();

  const handleNavLinkClick = (title) => {
    setSelectedCategory(title);
    navigate(`/${title}`);
  };

  let newsList = (
    <nav className='navbar justify-content-center nav-dark-mode'>
      <ul className={`d-flex m-0`}>
        {feedURLs.map(feed => (
          <li className={`list-unstyled mx-2`} key={feed.url}>
            <NavLink
              to={`/${feed.title}`}
              className={`cate-name w-25`}
              onClick={() => handleNavLinkClick(feed.title)}
            >
              {feed.title}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );

  return (
    <div className='fluid-container'>
      {newsList}
    </div>
  );
};

export default Navbar;
