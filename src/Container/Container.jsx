
import React, {useEffect, useState} from 'react';
import Card from '../Card/Card';

const Container = (props) => {
  const jokeCards = props.jokeSlips.map((joke) => {
    return (
      <div key={joke.id}>
        <Card
          id={joke.id}
          joke={joke.joke}
          saveCard={props.saveCard}
          deleteJoke={props.deleteJoke}
        />
      </div>
    );
  });

  return <div>{jokeCards}</div>;
};

export default Container;