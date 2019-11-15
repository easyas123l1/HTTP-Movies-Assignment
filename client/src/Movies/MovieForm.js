import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Star from './Star';

const initialForm = {
  title: '',
  director: '',
  metascore: '',
  star: '',
  stars: []
}

const MovieForm = props => {
  const [movie, setMovie] = useState(initialForm);

  const changeHandler = e => {
    e.persist();
    setMovie({...movie, [e.target.name]: e.target.value})  
  }

  useEffect(() => {
    if (props.movies.length > 0) {
      const newMovie = props.movies.find( movie => `${movie.id}` === props.match.params.id);
      setMovie(newMovie);
    }
  }, [props.movies, props.match.params.id])

  const handleSubmit = e => {
    e.preventDefault();
    axios.put(`http://localhost:5000/api/movies/${props.match.params.id}`, movie)
    .then(res => {
      console.log(res);
      props.updateMovies(props.match.params.id, res.data)
      setMovie({initialForm})
      props.history.push('/');
    })
    .catch(err => console.log(err));
  }

  const removeStar = remStar => {
    let newStars = movie.stars.filter(star => star !== remStar)
    setMovie({...movie, stars: newStars })
  }

  const addStar = e => {
    e.preventDefault();
    if (movie.star) {
      let newStars = movie.stars;
      newStars.push(movie.star);
      setMovie({...movie, star: '', stars: newStars })
    }
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
        {movie.stars.map(star => (
          <Star key={star} star={star} removeStar={removeStar} />
        ))}
        <br/>
        <input
        type='text'
        name='star'
        onChange={changeHandler}
        placeholder='add star'
        value={movie.star}
        /> 
        <button onClick={addStar}>Add Star</button><br/>
        <button>Update Movie</button>
    </form>
  );
};

export default MovieForm;