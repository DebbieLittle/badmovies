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
    // you might have to do something important here!
  }

  componentDidMount() {
    this.getMovies(28);
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
    this.setState({
      favorites: movie
    })
    console.log('savemovie firing')
  }

  deleteMovie() {
    // same as above but do something diff
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
          <Search getMovies={this.getMovies} swapFavorites={this.swapFavorites} showFaves={this.state.showFaves}/>
          <Movies movies={this.state.showFaves ? this.state.favorites : this.state.movies} showFaves={this.state.showFaves}
                  deleteMovie={this.deleteMovie} saveMovie={this.saveMovie} />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));