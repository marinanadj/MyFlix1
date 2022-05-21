import React from 'react';

export class MovieCard extends React.Component {
  render() {
    return <div className="movie-card">some title</div>;
  }
}
render() {
  const { movies } = this.state;

  if (movies.length === 0) return <div className="main-view">The list is empty!</div>;

  return (
    <div className="main-view">
      {movies.map(movie => <MovieCard />)}
    </div>
  );
}


{movies.map(movie => <MovieCard key={movie._id} movie={movie}/>)}