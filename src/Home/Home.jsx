
import React, { Component } from 'react';
import { getJoke } from '../apiCalls/apiCalls';
import Card from '../Card/Card';
import Container from '../Container/Container';

class Home extends Component {
  constructor () {
    super()
    this.state={
      jokes: [],
      favorites: []
    }
  }

  componentDidMount= async () => {
    const fetchedJoke = await getJoke();
    this.setState({ jokes: fetchedJoke.jokes });
  }


  render() {
    return(
      <div>
        <h2>Home component</h2>
        <Container jokeSlips={this.state.jokes} saveCard={saveCard} />
      </div>
    )
  }
}

export default Home;