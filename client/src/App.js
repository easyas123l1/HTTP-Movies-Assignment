import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import MovieForm from './Movies/MovieForm';
import MovieAddForm from './Movies/MovieAddForm';
import axios from "axios";

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/movies")
    .then(res => setMovies(res.data))
    .catch(error => console.log(error));
  }, []);

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  const updateMovies = (id, updateMovie) => {
    let newMovies = movies.map(movie => {
      if (movie.id === id) {
        return updateMovie;
      }
      return movie;
    })
    setMovies(newMovies)
  }

  return (
    <>
      <SavedList list={savedList} />
      <Route exact path="/" component={MovieList} />
      <Route
        path="/movies/:id"
        render={props => {
          return <Movie {...props} addToSavedList={addToSavedList} />;
        }}
      />
      <Route 
        path='/update-movie/:id'
        render={props => {
          return <MovieForm {...props} movies={movies} updateMovies={updateMovies} />
        }}
        />
      <Route
        path='/add-movie'
        render={props => <MovieAddForm {...props}  />}
        />
    </>
  );
};

export default App;
