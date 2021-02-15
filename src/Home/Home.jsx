
import React, { Component } from "react";
import { getJoke, addNewFavorite, getAllFavorites } from "../apiCalls/apiCalls";
import Container from "../container/Container";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import "./Home.css";
import PropTypes from "prop-types";


class Home extends Component {
  constructor() {
    super();
    this.state = {
      jokes: [],
      favorites: []
    };
  }

  componentDidMount = async () => {
    const fetchedFavorites = await getAllFavorites();
    const fetchedJoke = await getJoke();
    console.log('joke', fetchedJoke)
    this.setState({ jokes: fetchedJoke.jokes, favorites: fetchedFavorites });
  };

  saveCard = (id) => {
    const newFavorite = this.state.jokes.find(joke => joke.id === id )
    if (!this.state.favorites.includes(newFavorite.id)) {
      addNewFavorite(newFavorite.id, newFavorite.joke)
      return this.state.favorites.push(newFavorite)
    } else {
      return console.log("NO")
    }
  };

  render() {
    return (
      <div className="home" style={{marginTop: "8em"}}>
        <Link to="/favorites">
          <Button variant="contained" color="primary" className="favorite-button">My Favorites</Button>
        </Link>
        <Container jokeSlips={this.state.jokes} saveCard={this.saveCard} />
      </div>
    );
  }
}

Home.propTypes = {
  id: PropTypes.number,
  jokes: PropTypes.array,
  favorites: PropTypes.array
}

export default Home;