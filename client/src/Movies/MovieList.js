import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import MovieCard from "./MovieCard";
export default class MovieList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: []
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => this.setState({ movies: res.data }))
      .catch(err => console.log(err.response));
  }

  updateMovies = (movies) => {
    this.setState({movies: movies})
  }

  render() {
    let history = this.props;
    return (
      <div className="movie-list">
        {this.state.movies.map(movie => (
          <MovieDetails updateMovies={this.updateMovies} history={history} key={movie.id} movie={movie} />
        ))}
      </div>
    );
  }
}

function MovieDetails(props) {
  let history = props.history;
  let updateMovies = props.updateMovies
  return (
    <Link to={`/movies/${props.movie.id}`}>
      <MovieCard updateMovies={updateMovies} history={history} movie={props.movie} />
    </Link>
  );
}
