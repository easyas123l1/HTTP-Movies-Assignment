import React, { useState, useEffect } from 'react';
import axios from 'axios';

const initialForm = {
  title: '',
  director: '',
  metascore: '',
  stars: []
}

const MovieForm = props => {
  const [movie, setMovie] = useState(initialForm);

  const changeHandler = e => {
    e.persist();
    setMovie({...movie, [e.target.name]: e.target.value})  
  }

  useEffect(() => {
    console.log(props);
    if (props.movies.length > 0) {
      const newMovie = props.movies.find( movie => `${movie.id}` === props.match.params.id);
      setMovie(newMovie);
    }
  }, [props.movies, props.match.params.id])

  const handleSubmit = e => {
    e.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type='text'
        name='title'
        onChange={changeHandler}
        placeholder='title'
        value={movie.title}
        />
        <input 
        type='text'
        name='director'
        onChange={changeHandler}
        placeholder='director'
        value={movie.director}
        />
        <input 
        type='text'
        name='metascore'
        onChange={changeHandler}
        placeholder='metascore'
        value={movie.metascore}
        />
        {/* <input 
        type='text'
        name='title'
        onChange={changeHandler}
        placeholder='title'
        value={movie.title}
        /> */}
        <button>Update Movie</button>
    </form>
  );
};

export default MovieForm;