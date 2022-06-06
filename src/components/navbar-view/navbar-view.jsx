import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

import { Navbar, Nav, Button } from 'react-bootstrap';

import { connect } from 'react-redux';

import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';

import './nav-bar.scss';

//redux mapping filter to props for component
const mapStateToProps = (state) => {
  const { visibilityFilter, user } = state;
  return {
    visibilityFilter,
    user: state.user,
  };
};

//main Menubar Function
function Menubar(props) {
  const [searchBar, setSearchBar] = useState(false);
  const [fade, setFade] = useState('');

  const { visibilityFilter, user } = props;

  //getting route location to toggle search function
  const location = useLocation();

  const onLogOut = () => {
    localStorage.clear();
    window.open('/', '_self');
  };

  const isAuth = () => {
    if (typeof window == 'undefined') {
      return false;
    }
    if (localStorage.getItem('token')) {
      return localStorage.getItem('token');
    } else {
      return false;
    }
  };

  const toggleSearchBar = (e) => {
    if (fade !== '') {
      setFade('');
    } else {
      setFade('fade-in');
    }
    setSearchBar(!searchBar);
  };

  return (
    <Navbar
      className="main-nav nav-fill w-100"
      sticky="top"
      bg="light"
      expand="md"
      variant="light"
    >
      <Nav>
        {location.pathname === '/' && props.user ? (
          <div className="search-expand d-flex align-items-center">
            <a
              className="search-link"
              onClick={(e) => toggleSearchBar(e)}
              data-toggle="tooltip"
              data-placement="top"
              title="Search by Title"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="#000000"
                className="bi bi-search"
                viewBox="0 0 16 16"
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
              </svg>
            </a>
          </div>
        ) : (
          <div></div>
        )}

        {/* adding div to display searchbar on click */}
        <div className={`anim-search ${fade}`}>
          {searchBar && <VisibilityFilterInput />}
        </div>
      </Nav>
      <Navbar.Brand className="navbar-logo">
        <Nav.Link className="main-header-link" href={`/`}>
          {' '}
          What Do I Watch?
        </Nav.Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navba-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="ml-auto">
          {isAuth() && <Nav.Link href={`/`}>Home</Nav.Link>}

          {isAuth() && <Nav.Link href={`/users/${user}`}>Profile</Nav.Link>}
          {isAuth() && (
            <Button
              variant="link"
              onClick={() => {
                onLogOut();
              }}
            >
              Log Out
            </Button>
          )}
          {!isAuth() && <Nav.Link href="/">Sign In</Nav.Link>}
          {!isAuth() && <Nav.Link href="/register">Register</Nav.Link>}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default connect(mapStateToProps)(Menubar);