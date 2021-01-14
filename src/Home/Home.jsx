
import React, { Component } from 'react';
import { getJoke } from '../apiCalls/apiCalls';
import Card from '../Card/Card';
import Container from '../Container/Container';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      jokes: [],
      favorites: [],
    };
  }

  componentDidMount = async () => {
    const fetchedJoke = await getJoke();
    this.setState({ jokes: fetchedJoke.jokes });
  };

  saveCard = (id) => {
    console.log('click', id)
    const newFavorite = this.state.jokes.find(joke => joke.id === id )
    if (!this.state.favorites.includes(newFavorite)) {
      this.state.favorites.push(newFavorite);
      console.log(this.state.favorites)
    } else {
      return console.log("NO")
    }
  };

  render() {
    return (
      <div>
        <h2>Home component</h2>
        <Container jokeSlips={this.state.jokes} saveCard={this.saveCard} />
        <Container jokeSlips={this.state.favorites} />
      </div>
    );
  }
}

export default Home;