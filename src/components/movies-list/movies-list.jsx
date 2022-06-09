import React from 'react';
import { useState, useCallback, useEffect, useRef } from 'react';

//actions and reducers to manage sorting
import {
  setTrendingSort,
  toggleTrendingSort,
  setMovieSort,
  toggleMovieSort,
} from '../../actions/actions';

import { useHistory } from 'react-router-dom';

import Slider from 'react-slick';

import { connect } from 'react-redux';

import { Row, Dropdown, Col } from 'react-bootstrap';
import { ArrowUp, ArrowDown } from 'react-bootstrap-icons';

//components to import and render
import MovieCard from '../movie-card/movie-card';

//styles for filters
import './movies-list.scss';


//mapping filter and favorites to props ma
const mapStateToProps = (state) => {
  const { visibilityFilter, trendSort, movieSort } = state;
  return { visibilityFilter, trendSort, movieSort };
};

//settings for the slider
let sliderSettings = {
  dots: false,
  infinite: false,
  rows: 1,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 1,
  swipeToSlide: true,
  responsive: [
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: false,
        dots: false,
      },
    },
  ],
};

function MoviesList(props) {
  const { movies, visibilityFilter, sort, trendSort, movieSort } = props;
  const [dragging, setDragging] = useState(false);

  //setting up to navigate to specific movie
  const history = useHistory();

  //allowing slider to reset to start when filter is applied
  const totalSlide = useRef();
  const trendSlide = useRef();

  useEffect(() => {
    let trendLocation = localStorage.getItem('trendSlide');
    let movieLocation = localStorage.getItem('movieSlide');
    if (visibilityFilter === '') {
      if (trendLocation) {
        setDragging(false);
        trendSlide.current.slickGoTo(trendLocation);
      }
      if (movieLocation) {
        setDragging(false);
        totalSlide.current.slickGoTo(movieLocation);
      }
    }
  }, []);

  //to prevent a click when user is dragging slider using before and after change functions
  function handleBeforeChangeTrend(curr, next) {
    let trendLocation = localStorage.getItem('trendSlide');
    if (trendLocation) {
      curr = Number(trendLocation);
    }
    localStorage.setItem('trendSlide', next);
    if (curr === next) {
      setDragging(false);
    } else {
      setDragging(true);
    }
  }

  function handleBeforeChangeMovie(curr, next) {
    let movieLocation = localStorage.getItem('movieSlide');
    if (movieLocation) {
      curr = Number(movieLocation);
    }
    localStorage.setItem('movieSlide', next);
    if (curr === next) {
      setDragging(false);
    } else {
      setDragging(true);
    }
  }

  const handleAfterChange = useCallback(() => {
    setDragging(false);
  }, [setDragging]);

  //pushing movie details on click
  const handleOnItemClick = (param, dragToggle) => (e) => {
    if (!dragToggle) {
      history.push(`/movies/${param}`);
    } else {
      if (dragging) {
        e.stopPropagation();
      } else {
        history.push(`/movies/${param}`);
      }
    }
  };

  //dynamically creating dropdowns tied to each slider
  const filterGenerator = (srcForFilter) => {
    return (
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            fill="#fff"
            className="filter bi bi-filter-circle"
            viewBox="0 0 16 16"
          >
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
            <path d="M7 11.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5z" />
          </svg>
        </Dropdown.Toggle>
        <Dropdown.Menu style={{ margin: 0 }}>
          <Dropdown.Item
            filterclick={srcForFilter}
            onClick={(e) => sortHandler(e)}
          >
            <Row sorttype="titleSort" className="sortitem d-flex alpha">
              Sort By Title
              {setSortArrow(srcForFilter, 'titleSort')}
            </Row>
          </Dropdown.Item>
          <Dropdown.Item
            filterclick={srcForFilter}
            onClick={(e) => sortHandler(e)}
          >
            <Row sorttype="ratingSort" className="sortitem d-flex alpha">
              Sort By Rating
              {setSortArrow(srcForFilter, 'ratingSort')}
            </Row>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  };

  //handling the sorting click and updating the method and target of sorting
  const sortHandler = (e) => {
    let filterOrigin = e.target.parentNode.getAttribute('filterclick');
    let filterType = e.target.getAttribute('sorttype');

    if (filterOrigin.includes('trending')) {
      if (props.trendSort[filterType] === undefined) {
        props.setTrendingSort({
          titleSort: filterType === 'titleSort' ? 1 : 0,
          ratingSort: filterType === 'titleSort' ? 0 : 1,
        });
      } else {
        props.toggleTrendingSort(filterType);
      }
      trendSlide.current.slickGoTo(0);
      localStorage.setItem('trendSlide', 0);
    } else {
      if (props.movieSort[filterType] === undefined) {
        props.setMovieSort({
          titleSort: filterType === 'titleSort' ? 1 : 0,
          ratingSort: filterType === 'titleSort' ? 0 : 1,
        });
      } else {
        props.toggleMovieSort(filterType);
      }
      totalSlide.current.slickGoTo(0);
      localStorage.setItem('movieSlide', 0);
    }
  };

  const setSortArrow = (filterSource, field) => {
    let propMap = filterSource.includes('movies') ? 'movieSort' : 'trendSort';
    // let filterVal = props.sort.find((itm) => itm.origin === filterSource);
    if (!props[propMap][field]) return <div></div>;
    switch (props[propMap][field]) {
      case 1:
        return <ArrowUp color="black" size={15} />;
      case 2:
        return <ArrowDown color="black" size={15} />;
      default:
        return <div></div>;
    }
  };

  //setting filtered to default prop
  let filteredMovies = [];

  if (visibilityFilter !== '') {
    filteredMovies = movies.filter((m) =>
      m.Title.toLowerCase().includes(visibilityFilter.toLowerCase())
    );
    filteredTrending = props.trending.filter((m) =>
      m.Title.toLowerCase().includes(visibilityFilter.toLowerCase())
    );
    filteredMovies = filteredMovies.concat(filteredTrending);
  }

  if (!movies) {
    return <div className="main-view" />;
  }

  //applying the sorts as they update
  //trending Sorts
  if (props.trendSort.titleSort === 0 && props.trendSort.ratingSort === 0) {
    props.trending.sort((a, b) => (a._id > b._id ? 1 : b._id > a._id ? -1 : 0));
  }

  if (props.trendSort.ratingSort > 0) {
    if (props.trendSort.ratingSort === 1) {
      props.trending.sort((a, b) =>
        b.Rating > a.Rating ? 1 : a.Rating > b.Rating ? -1 : 0
      );
    } else {
      props.trending.sort((a, b) =>
        a.Rating > b.Rating ? 1 : b.Rating > a.Rating ? -1 : 0
      );
    }
  }

  if (props.trendSort.titleSort > 0) {
    if (props.trendSort.titleSort === 1) {
      props.trending.sort((a, b) =>
        a.Title > b.Title ? 1 : b.Title > a.Title ? -1 : 0
      );
    } else {
      props.trending.sort((a, b) =>
        b.Title > a.Title ? 1 : a.Title > b.Title ? -1 : 0
      );
    }
  }

  //movie list sorts
  if (props.movieSort.titleSort === 0 && props.movieSort.ratingSort === 0) {
    movies.sort((a, b) => (a._id > b._id ? 1 : b._id > a._id ? -1 : 0));
  }

  if (props.movieSort.ratingSort > 0) {
    if (props.movieSort.ratingSort === 1) {
      movies.sort((a, b) =>
        b.Rating > a.Rating ? 1 : a.Rating > b.Rating ? -1 : 0
      );
    } else {
      movies.sort((a, b) =>
        a.Rating > b.Rating ? 1 : b.Rating > a.Rating ? -1 : 0
      );
    }
  }

  if (props.movieSort.titleSort > 0) {
    if (props.movieSort.titleSort === 1) {
      movies.sort((a, b) =>
        a.Title > b.Title ? 1 : b.Title > a.Title ? -1 : 0
      );
    } else {
      movies.sort((a, b) =>
        b.Title > a.Title ? 1 : a.Title > b.Title ? -1 : 0
      );
    }
  }

  return (
    <div className="shows-wrapper">
      {visibilityFilter != '' && (
        <div className="filtered">
          <div className="show-section">
            <Row className="d-flex align-items-center">
              <h3>Search Results ({filteredMovies.length})</h3>
            </Row>
            <Row>
              {filteredMovies.map((m) => (
                <Col md={3} key={m._id}>
                  <MovieCard
                    movie={m}
                    onMovieClick={() => handleOnItemClick(m._id, false)}
                  />
                </Col>
              ))}
            </Row>
          </div>
        </div>
      )}

      {visibilityFilter === '' && (
        <div className="unfilter">
          <div className="show-section">
            <Row className="d-flex align-items-center">
              <h3>Trending ({props.trending.length})</h3>
              {filterGenerator('trending')}
            </Row>
            <Slider
              beforeChange={(current, next) =>
                handleBeforeChangeTrend(current, next)
              }
              afterChange={handleAfterChange}
              {...sliderSettings}
              ref={trendSlide}
            >
              {props.trending.map((m) => (
                <div key={m._id} className="mcard">
                  <MovieCard
                    movie={m}
                    onMovieClick={() => handleOnItemClick(m._id, true)}
                  />
                </div>
              ))}
            </Slider>
          </div>
          <div className="show-section">
            <Row className="d-flex align-items-center">
              <h3>Movies and Shows ({movies.length})</h3>
              {filterGenerator('movies')}
            </Row>
            <Slider
              beforeChange={(current, next) =>
                handleBeforeChangeMovie(current, next)
              }
              afterChange={handleAfterChange}
              {...sliderSettings}
              ref={totalSlide}
            >
              {movies.map((m) => (
                <div key={m._id} className="mcard">
                  <MovieCard
                    movie={m}
                    onMovieClick={() => handleOnItemClick(m._id, true)}
                  />
                </div>
              ))}
            </Slider>
          </div>
        </div>
      )}
    </div>
  );
}

export default connect(mapStateToProps, {
  setTrendingSort,
  toggleTrendingSort,
  setMovieSort,
  toggleMovieSort,
})(MoviesList);