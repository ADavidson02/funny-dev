
import React, { useEffect, useState } from 'react';
import './Card.css';

const Card = ({id, joke, saveCard, deleteJoke }) => {
  const pathname = window.location.pathname;

  return (
    <section className='joke-card'>
      {pathname === '/' ?
      <button className='heart-button' onClick={() => saveCard(id)}>save</button> :
      <button onClick={() => deleteJoke(id)}>delete</button>}
      <article key={id}>
        <h3>{joke}</h3>
      </article>
    </section>
  )
}

export default Card;