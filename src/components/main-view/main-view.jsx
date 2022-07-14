import React from 'react';
import axios from 'axios';

import { connect } from 'react-redux';

import { BrowserRouter as Router, Route, Routes, Redirect } from 'react-router-dom';

import { 
    setMovies, 
    setUser
    } from '../../actions/actions';

import MoviesList from '../movies-list/movies-list';


import { MenuBar } from '../navigationbar-view/navigationbar-view';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieView } from '../movie-view/movie-view';
// import { MovieCard } from '../movie-card/movie-card';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view'; 
import ProfileView from '../profile-view/profile-view';
import { Container, Col, Row } from 'react-bootstrap';
import { NavbarView as MenuBar } from "../navigationbar-view/navigationbar-view";

import './main-view.scss';

class MainView extends React.Component {
    constructor() {
        super();
        this.state= {
            movies: [],
            user: null,
            fullUser: {}
        };
    }

    componentDidMount(){
        const accessToken = localStorage.getItem('token');
        const user = localStorage.getItem('user');
        console.log(accessToken)
        if (accessToken !== null) {
            console.log('before axios')
            axios.get(`https://marinanadj-53303.herokuapp.com/users/${user}`, {
                headers: { Authorization: `Bearer ${accessToken}`}
            })
            .then(res => {
                console.log(res)
                const fullUser = res.data;
                this.setState({
                    fullUser: fullUser,
                    user: localStorage.getItem('user')
                })
                this.getMovies(accessToken);
            })
            .catch(function (error) {
                console.log(error)
            });
        }
    }

    //When a movie is clicked, function is invoked and updates
    //the state of the selectedMovie property to that movie
    setSelectedMovie(movie) {
        this.setState({
            selectedMovie: movie
        });
    }

    getMovies(token) {
        console.log('get movies', token)
        axios.get('https://marinanadj-53303.herokuapp.com/movies', {
            headers: { Authorization:`Bearer ${token}`}
        })
        .then(response => {
            // this.props.setMovies(response.data);
            //Assign result of state
            this.setState({
                movies: response.data
            });
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    //On succesful login, function updates the user property in 
    //state to that user
    onLoggedIn(authData) {
        console.log(authData);
        this.setState({
            user: authData.user.Username
        });

        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.Username);
        this.getMovies(authData.token);
    }

    //User logout
    onLoggedOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.setState({
            user: null
        });
    }

    render() {
        if (!this.state) return <>loading...</>
        const { movies, user } = this.state;
        // const { movies, user } = this.props;
        console.log('logged in: ', user);
        console.log("Full User? --> ", this.state.fullUser)

        return (
            
            <Router>
                <MenuBar user={user} />
                <Container>
                <Row className="main-view justify-content-md-center">
                    {/* <Routes> */}
                        {/* Login */}
                    <Route exact path="/" render={() => {
                        if (!user && !localStorage.getItem('user')) return <Col>
                            <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                        </Col>
                        return <MoviesList movies={movies}/>
                    }} />
                        {/* RegistrationView */}
                    <Route path="/register" render={() => {
                        if(user) {
                            <Redirect to="/" />
                        }
                        return (
                            <Col lg={8} md={8}>
                                <RegistrationView />
                            </Col>
                        )
                    }} />
                        {/* MovieView */}
                    <Route path="/movies/:movieId" render={({ match, history }) => {
                        if (!user) return <Col>
                            <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                        </Col>

                        return <Col md={8}>
                            <MovieView user={this.state?.fullUser} movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
                        </Col>
                    }} />
                        {/* DirectorView */}
                    <Route path="/directors/:name" render={( { match, history }) => {

                        if (!user) return <Col><LoginView onLoggedIn={user => this.onLoggedIn(user)} /></Col>

                        return ( 
                            <Col md={8} >
                                <DirectorView director={movies.find(m => m.Director.Name === match.params.name)?.Director} onBackClick={() => history.goBack()} />
                            </Col>
                        )
                    }} />
                        {/* GenreView */}
                    <Route path="/genres/:name" render={({ match, history }) => {
                        if (!user) return <Col>
                            <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                        </Col>
                        return <Col md={8}>
                            <GenreView genre={movies.find(m => m.Genre.Name === match.params.name)?.Genre} onBackClick={() => history.goBack()} />
                        </Col>
                    }} />
                        {/* ProfileView */}
                    <Route path={`/users/${user}`} render={({ history }) => {
                        //IF statement removed because it was causing issues with ProfileView
                        //  if (!user) return <Redirect to="/"
                        // />
                        return <Col>
                            <ProfileView movies={movies} user={user} onBackClick={() => history.goBack()} />
                        </Col>
                    }} />
                    {/* </Routes> */}
                </Row>
                </Container>
            </Router>
            
        );
    }
}

let mapStateToProps = store => {
    return { 
        movies: store.movies,
        user: store.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setUser: (user) => {
            dispatch(setUser(user))
        },
        setMovies: (movies) => {
            dispatch(setMovies(movies))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainView);