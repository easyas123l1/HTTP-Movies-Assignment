import React, { useState } from 'react';
import Star from './Star';
import axios from 'axios';

const initialForm = {
  title: '',
  director: '',
  metascore: '',
  star: '',
  stars: []
}

const MovieAddForm = props => {
  const [movie, setMovie] = useState(initialForm);

  const changeHandler = e => {
    e.persist();
    setMovie({...movie, [e.target.name]: e.target.value})  
  }

  const removeStar = remStar => {
    let newStars = movie.stars.filter(star => star !== remStar)
    setMovie({...movie, stars: newStars })
  }

  const handleSubmit = e => {
    e.preventDefault();
    axios.post(`http://localhost:5000/api/movies/`, movie)
    .then(res => {
      console.log(res);
      setMovie({...movie, stars: []})
      props.history.push('/');
    })
    .catch(err => console.log(err));
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
        <button>Add Movie</button>
    </form>
  );
};

export default MovieAddForm;