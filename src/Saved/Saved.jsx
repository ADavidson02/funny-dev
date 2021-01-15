
import React, { Component } from 'react';
import { getAllFavorites } from '../apiCalls/apiCalls';
import Card from '../Card/Card';
import Container from '../Container/Container';
import { Link } from 'react-router-dom';

class Saved extends Component {
  constructor() {
    super()
    this.state={
      favorites: []
    }
  }

  componentDidMount = async () => {
    const allJokes = await getAllFavorites();
    this.setState({favorites: allJokes })
    console.log(allJokes)
  }

  deleteJoke = (id) => {
    const badJoke = this.state.favorites.find(joke => joke.id === id)

    
  }

  render() {
    return(
      <div>
        <Link to='/'><button>Home</button></Link>
        <h2>My favorite jokes</h2>
        <Container jokeSlips={this.state.favorites} />
      </div>
    )
  }
}

export default Saved;