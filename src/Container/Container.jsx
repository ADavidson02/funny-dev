
import React from "react";
import Card from "../Card/Card";
import "./Container.css";
import PropTypes from "prop-types";


const Container = (props) => {
  const { jokeSlips} = props;

  const jokeCards = jokeSlips.map((joke) => {
    return (
      <div key={joke.id} className="container">
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

Container.prototype = {
  jokeSlips: PropTypes.object,
  id: PropTypes.number,
  joke: PropTypes.string,
  saveCard: PropTypes.func,
  deleteJoke: PropTypes.func
}

export default Container;