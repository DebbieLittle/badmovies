import React from 'react';
import axios from 'axios';

class Movies extends React.Component {
  constructor(props) {
    super(props)

    this.handleMovieClick = this.handleMovieClick.bind(this)
  }
  // Make an onClick for each list item. If the movies shown is the search results, 
  // onClick add it to the database (do it in the main app, and pass down the function)

  // If you're currently showing the fave list, delete the movie instead
  // You can tell which list is currently being rendered based on whether the prop "showFaves" is false (search results) or true (fave list) (within index.jsx)

  handleMovieClick (movieObj){
    if (this.props.showFaves) this.props.deleteMovie(movieObj.title)
    else this.props.saveMovie(movieObj)
  }
  
  render() {
    // console.log(this.props)
    // console.log('MOVIES CLASS PROPS', this.props)
    return (
      <ul className="movies">
    {this.props.movies.length > 0 && this.props.movies.map((movie) => {
      return (
    <li className="movie_item" key={movie.title} onClick={() => this.handleMovieClick(movie)}>
      <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} />
      <div className="movie_description">
        <h2>{movie.title}</h2>
        <section className="movie_details">
          <div className="movie_year">
            <span className="title">Release Date</span>
            <span>{movie.release_date}</span>
          </div>
          <div className="movie_rating">
            <span className="title">Rating</span>
            <span>{movie.popularity}</span>
          </div>
        </section>
      </div>
    </li>)
    })}
    </ul>
    )
  }
}

export default Movies;