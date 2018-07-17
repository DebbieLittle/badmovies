import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
// import AnyComponent from './components/filename.jsx'
import Search from './components/Search.jsx'
import Movies from './components/Movies.jsx'
import axios from 'axios';


class App extends React.Component {
  constructor(props) {
  	super(props)
  	this.state = {
      movies: [],
      favorites: [],
      showFaves: false
    };
    this.getMovies = this.getMovies.bind(this);
    this.saveMovie = this.saveMovie.bind(this);
    this.deleteMovie = this.deleteMovie.bind(this);
    this.swapFavorites = this.swapFavorites.bind(this);
    this.getFavorites = this.getFavorites.bind(this);
    // you might have to do something important here!
  }

  componentDidMount() {
    this.getMovies(28);
    this.getFavorites();
  }

  getMovies(selectedGenre) {
    // make an axios request to your server on the GET SEARCH endpoint
    console.log(`Genre ID ${selectedGenre} was searched`)
  
    axios.get('/search', {
      params: {
        selectedGenre: selectedGenre
      }
    })
    .then((res) => {
      this.setState({
        movies: res.data
      })
    })
    .catch((err) => {
      console.log('GET MOVIES ERR', err)
    })
  }

  saveMovie(movie) {
    axios.post('/save', {
      title: movie.title,
      release_date: movie.release_date,
      popularity: movie.popularity,
      poster_path: movie.poster_path
    })
    .then(res => {
      this.getFavorites();
    })
    .catch(res => {
      console.log('saveMovieInfo err', err)
    })
  }

  deleteMovie(title) {
    axios.post('/delete', {
      title: title
    })
    .then(() => {
      this.getFavorites();
    })
  }

  getFavorites() {
    axios.get('/favorites')
    .then(res => {
      this.setState({
        favorites: res.data
      })
    })
  }

  swapFavorites() {
  //dont touch
    this.setState({
      showFaves: !this.state.showFaves
    });
  }

  render () {
  	return (
      <div className="app">
        <header className="navbar"><h1>Bad Movies</h1></header> 
        
        <div className="main">
          <Search getMovies={this.getMovies} getFavorites={this.getFavorites} swapFavorites={this.swapFavorites} showFaves={this.state.showFaves}/>
          <Movies movies={this.state.showFaves ? this.state.favorites : this.state.movies} showFaves={this.state.showFaves}
                  deleteMovie={this.deleteMovie} saveMovie={this.saveMovie} />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));