
import React, { useEffect, useState } from 'react';
import './Card.css';

const Card = ({id, joke, setup, delivery, saveCard}) => {

  return (
    <section className="joke-card">
      <button onClick={() => saveCard(id)}>heart</button>
      <article key={id}>
        <h3>{joke || setup}</h3>
        <h4>{delivery}</h4>
      </article>
    </section>
  )
}

export default Card;