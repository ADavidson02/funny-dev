
import React, { useEffect, useState } from 'react';
import './Card.css';

const Card = ({id, joke, saveCard}) => {

  return (
    <section className='joke-card'>
      <button className='heart-button' onClick={() => saveCard(id)}>heart</button>
      <article key={id}>
        <h3>{joke}</h3>
      </article>
    </section>
  )
}

export default Card;