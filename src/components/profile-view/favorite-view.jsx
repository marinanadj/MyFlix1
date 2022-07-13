import React, {useState, useEffect} from 'react';
import {Card, Link, Button, Row, Col, Image, Stack, Spinner} from 'react-bootstrap';
import axios from 'axios';




export function FavoritesView(props) {

  const baseURL = 'https://marinanadj-53303.herokuapp.com//';
  
  const [user, setUser] = useState(props.user);
  const [favoriteMovies, setFavoriteMovies] = useState('');
  const [movies, setMovies] = useState(props.movies);
 
  //Setting loading and error variables 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  let accessToken = localStorage.getItem('token');
  let activeUser = localStorage.getItem('user');

  useEffect(() => {
    
    movies.forEach(movie => {
                    if (user.FavoriteMovies.includes(movie._id)) setFavoriteMovies(prevData => {
                        return [...prevData, movie]
                    })
                  })
	setLoading(false)
    },[])

  	if (error) {
    return <Row className="justify-content-center my-5">
        <p>There was an error loading your data!</p>
        </Row> 
    }

    //If data is not fetched, show spinner
    if (loading) {
        return <Row className="justify-content-center my-5">
                    <div className="h3 text-muted text-center">Data is loading
                        &nbsp;<Spinner animation="border" variant="secondary" role="status" />
                    </div>
                </Row>		
    }

    const removeMovieFromFavs = (e) => {
      let movieToRemove = ([e.target.id]);
      axios.delete(baseURL+'users/'+ activeUser +'/favs/'+ movieToRemove, { headers: { Authorization: `Bearer ${accessToken}`} })
        .then(response => {
                  console.log(response.data);
          setFavoriteMovies(favoriteMovies.filter(mov => mov._id != movieToRemove))
          })
              .catch(error => {
          console.log(error);
                  setError(error);
              })
    }

    const cardUnit = (movie) => {
      return <>
              <Card>
				<Card.Body className='d-flex justify-content-between px-4 py-2 align-items-center'>
				<Card.Text as='div'>
					{movie.Title}
				</Card.Text>
				<Button variant="secondary" size="sm" onClick={removeMovieFromFavs} id={movie._id}>
					Remove
				</Button>
				</Card.Body>
                {/* <Link to={`/movies/${movie._id}`}> */}
                    <Card.Img variant="bottom" src={movie.ImagePath} crossOrigin="anonymous"/>
                {/* </Link>  */}
            </Card>
    	</>
    }


    return(
		<>
		<Row className="justify-content-center my-3"><Col><div className="h6 text-muted text-center m-1 p-2">Favorite Movies</div></Col></Row>
		<Row className="justify-content-center">
			<Col>
				<>
					{<Row className="main-view justify-content-md-evenly m-0 p-2 align-items-start">
						{(favoriteMovies.length > 0) 
						? favoriteMovies.map(movie => (<Col md={3} key={movie._id}>{cardUnit(movie)}</Col>)) 
						: <Col><div className="h6 text-muted text-center">You have not added yet a favorite movie</div></Col>}
					</Row>}
				</>
			
			</Col>
		
		</Row>
		</>
  )

}