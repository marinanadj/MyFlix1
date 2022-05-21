import React from 'react';

export class MovieView extends React.Component {

  keypressCallback(event) {
    console.log(event.key);
}

//Add Keypress event listener
componentDidMount() {
    document.addEventListener('keypress', this.keypressCallback);
}

//Unmount event listener
componentWillUnmount() {
    document.removeEventListener('keypress', this.keypressCallback);
}
    render()  {
      const { movie, onBackClick } = this.props;
  
      return (
  
        <Container fluid className="moviesContainer">
          <Row>
            <Col>
              <div className="movie-view">

                <div className="movie-poster">
                  <img src={movie.ImagePath} crossOrigin="true" />
                </div>
                <div className="movie-title">
                  <span className="title">Title: </span>
                  <span className="value">{movie.Title}</span>
                </div>

                <div className="movie-description">
                  <span className="description">Description: </span>
                  <span className="value">{movie.Description}</span>
                </div>
                <div className="movie-genre">
                  <span className="genre">Genre: </span>
                  <span className="value">{movie.Genre.Name}</span>
                </div>
                <div className="genre-description">
                  <span className="genre">Description: </span>
                  <span className="value">{movie.Genre.Description}</span>
                </div>
                <div className="movie-director">
                  <span className="director">Director: </span>
                  <span className="value">{movie.Director.Name}</span>
                </div>
                <div className="director-bio">
                  <span className="director">Bio: </span>
                  <span className="value">{movie.Director.Bio}</span>
                </div>

                <div className="movie-button-div">
                  <Button className="movie-button" bg="dark" variant="dark" onClick={() => {
                       onBackClick(null); 
                       }}>
                           Back</Button>
                </div>
                
  
              </div>
            </Col>
          </Row>
          
         </Container>
      );
    }
  }

MovieView.propTypes = {
  movie: PropTypes.shape({
      ImagePath: PropTypes.string.isRequired,
      Title: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
      Genre: PropTypes.shape({
          Name: PropTypes.string.isRequired
        }),
        Director: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Bio: PropTypes.string.isRequired
        }),
  }).isRequired,
  onBackClick: PropTypes.func.isRequired
};