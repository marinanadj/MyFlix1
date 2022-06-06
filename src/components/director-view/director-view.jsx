import React, {useState, useEffect} from 'react'
import {Row, Col, Spinner, ListGroup } from 'react-bootstrap';
import axios from 'axios';
import {
	useParams,
} from "react-router-dom";
import { MovieCard } from '../movie-card/movie-card'
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

export function DirectorView() {

    //REACT REDUX way to get state
    const movies = useSelector((state) => state.movies)
    //Parameter of director_id from URL 
    const {director_id} = useParams();

    const [director, setDirector ] = useState('');
    const [directorMovies, setDirectorMovies] = useState('');

    //Setting loading and error variables 
		const [loading, setLoading] = useState(true);
		const [error, setError] = useState();
    
    useEffect(() => {
      let accessToken = localStorage.getItem('token');
        getMissingData(accessToken)
        setDirectorMovies(getMoviesFromDirector());
      },[])

      async function getMissingData(accessToken) {
        axios('directors/' + director_id,{ headers: { Authorization: `Bearer ${accessToken}`} } )
              .then(response => {
                  setDirector(response.data)
              })  
              .catch(error => console.error(error))
              .finally(() => {
                  setLoading(false)
              })												
      }

      const getMoviesFromDirector = () => {
        let moviesFromDirector = [];
        movies.forEach(movie => {
          if (movie.Director === director_id) 
          moviesFromDirector.push(movie)
        })
        return moviesFromDirector
      }
       
      //While data is not fetched, show spinner
  if (loading) {
    return <Row className="justify-content-center my-5">
          <div className="h3 text-muted text-center">Data is loading
            &nbsp;<Spinner animation="border" variant="secondary" role="status" />
          </div>
        </Row>		
   }

  if (error) {
    return <Row className="justify-content-center my-5">
      <p>There was an error loading your data!</p>
      </Row>
  }

  return (
    <>  
        <Row className="justify-content-center p-2 m-4">
            <ListGroup>
              <ListGroup.Item className="h3 justify-content-center">{director.Name}</ListGroup.Item>
              <ListGroup.Item className="h6 text-muted">{director.Bio}</ListGroup.Item>
            </ListGroup>
        </Row>
        <ListGroup horizontal>
            <Row> 
                <Col>
                  <ListGroup>
                      <ListGroup.Item className="h6 text-muted">Movies from {director.Name}</ListGroup.Item>
                  </ListGroup>
                </Col>
            </Row>
            <Row className="main-view justify-content-md-evenly m-0 p-2 align-items-start">{(directorMovies.length > 0) ? directorMovies.map(movie => 
                  (<Col md={3} key={movie._id}><MovieCard md={8} movie={movie} /></Col>)) : <Col md={3}>There are no movies of this director</Col>}
            </Row>
        </ListGroup>    
       
           
    </>
    
  )
}

DirectorView.propTypes = {
  director: PropTypes.shape({
    Name: PropTypes.string.isRequired,
  }).isRequired
};