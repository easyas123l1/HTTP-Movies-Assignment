import React from 'react';

const Star = props => {

  const handleRemoveStar = e => {
    e.preventDefault();
    props.removeStar(props.star);
  }

  return (
    <>
      <h1>Star: {props.star} </h1>
      <button onClick={handleRemoveStar}>Remove Star</button>
    </>
  );
};

export default Star;