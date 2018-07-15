import React from 'react';
import axios from 'axios'

class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      genres: [],
      selectedGenre: ''
    };
    this.getGenres = this.getGenres.bind(this)
    this.setGenre = this.setGenre.bind(this)
    this.searchByGenre = this.searchByGenre.bind(this)
  }

  componentDidMount() {
    this.getGenres()
  }

  getGenres() {
    //make an axios request in this component to get the list of genres from your endpoint GET GENRES
    axios.get('/genres')
    .then((genres) => {
      this.setState({
        genres: genres.data
      })
    })
    .catch((err) => {
      console.log(err)
    })
  }

  setGenre(e) {
    this.setState({ selectedGenre: e.target.value})
  }

  searchByGenre() {
    this.props.getMovies(this.state.selectedGenre)
  }

  render() {
    return (
      <div className="search">
        <button onClick={() => {this.props.swapFavorites()}}>{this.props.showFaves ? "Show Results" : "Show Favorites"}</button>
        <br/><br/>

        {/* Make the select options dynamic from genres !!! */}
        {/* How can you tell which option has been selected from here? */}

        <select onChange={this.setGenre} value={this.state.genres.id}>
          <option> Select Genre </option>
          {this.state.genres.map((genre) => {
            return <option value={genre.id} key={genre.name}>{genre.name}</option>
          })}
        </select>
        <br/><br/>

        <button onClick={this.searchByGenre}>Search</button>

      </div>
    );
  }
}

export default Search;