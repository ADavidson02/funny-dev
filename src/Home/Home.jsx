
import React, { Component } from 'react';
import { getJoke, addNewFavorite } from "../apiCalls/apiCalls";
import Container from '../Container/Container';
import { Link } from 'react-router-dom';
import { Button } from "@material-ui/core";
import './Home.css'


class Home extends Component {
  constructor() {
    super();
    this.state = {
      jokes: [],
      favorites: []
    };
  }

  componentDidMount = async () => {
    const fetchedJoke = await getJoke();
    this.setState({ jokes: fetchedJoke.jokes });
  };

  saveCard = (id) => {
    const newFavorite = this.state.jokes.find(joke => joke.id === id )
    if (!this.state.favorites.includes(newFavorite)) {
      this.state.favorites.push(newFavorite)
      addNewFavorite(newFavorite.id, newFavorite.joke)
    } else {
      return console.log("NO")
    }
  };

  render() {
    return (
      <div className='home'>
        <Link to="/favorites">
          <Button variant="contained" color="primary" className='favorite-button'>My Favorites</Button>
        </Link>
        <Container jokeSlips={this.state.jokes} saveCard={this.saveCard} />
      </div>
    );
  }
}

export default Home;