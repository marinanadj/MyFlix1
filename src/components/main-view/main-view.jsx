import React from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export class MainView extends React.Component {

  constructor(){
    super();
    this.state = {
      movies: [
        { _id: 1, Title: 'Inception', Description: 'Inception is a 2010 science fiction action film written and directed by Christopher Nolan, who also produced the film with Emma Thomas, his wife. The film stars Leonardo DiCaprio as a professional thief who steals information by infiltrating the subconscious of his targets.', ImagePath: '...'},
        { _id: 2, Title: 'The Shawshank Redemption', Description: 'This movie, The Shawshank Redemption, starring Tim Robbins and Morgan Freeman, is an American prison drama. It is based on a novella by Stephen King. It portrays the story of a successful banker who evidences the cruelties and abuses held in prisons.', ImagePath: '...'},
        { _id: 3, Title: 'Gladiator', Description: 'Gladiator (film) Gladiator is een Amerikaanse-Britse film uit 2000 die zich afspeelt in de Romeinse tijd. De film werd geschreven door David Franzoni en geregisseerd door Ridley Scott. Het is een fictief verhaal geïnspireerd op keizer Commodus en zijn vader Marcus Aurelius.', ImagePath: '...'}
      ],
      selectedMovie: null
    }
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  render() {
    const { movies, selectedMovie } = this.state;

    if (selectedMovie) return <MovieView movie={selectedMovie} />;
  
    if (movies.length === 0) return <div className="main-view">The list is empty!</div>;
  
    return (
      <div className="main-view">
        {selectedMovie
          ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
          : movies.map(movie => (
            <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }}/>
          ))
        }
      </div>
    );
  }
}
export default MainView;