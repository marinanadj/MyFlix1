import React from 'react';
import axios from 'axios';
import { Row, Col } from 'react-bootstrap';

import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { NavigationbarView } from '../navigationbar-view/navigationbar-view';

const inLogo = require('../../img/Inception.jpg');
const tsLogo = require('../../img/ShawshankRedemption.jpg');
const glLogo = require('../../img/Gladiator.png');

//getting an array of movies
export class MainView extends React.Component {
  // code executed right when the component is created in the memory
   constructor(){
      super();
        this.state = {
             movies: [],
             selectedMovie: null,
             registered: null,
             user: null            
    }
  }
  //This will be executed after loading the page
    componentDidMount() 
    { axios
      .get('http://localhost:8080/movies')
      .then(response => {
          this.setState({ movies: response.data });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  
    //sets the selected movie state with value
  setSelectedMovie(newSelectedMovie) 
  { this.setState({
      selectedMovie: newSelectedMovie
    });
  }

   //when user is verified set state to current user
  onLoggedIn(user) {
    this.setState({
      user,
    });
  }

  onRegister(registered) {
    this.setState({
      registered,
    });
  }

  render() {
    const { movies, selectedMovie, user, registered } = this.state;

    //forcing a registration form for testing
    if (registered) {
      return <RegistrationView onRegister={(bool) => this.onRegister(bool)} />;
    }

    //if user is no logged in - force a login form
    if (!user) {
      return (
        <NavigationbarView />,
        <LoginView
          onLoggedIn={(user) => this.onLoggedIn(user)}
          onRegister={(bool) => this.onRegister(bool)}
        />
      );
    }

    if (movies.length === 0) return <div className="main-view" />;
  
    return (
      <div className="main-view">
        {selectedMovie
          ? (
            <Row className="justify-content-md-center">
              <Col md={8}>
                <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
              </Col>
            </Row>
          )
          : movies.map(movie => (
            <MovieCard key={movie._id} movie={movie} onMovieClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
          ))
        }
      </div>
    );
  }
}