
import React, { Component, useEffect, useState } from 'react';
import { getJoke, addNewFavorite } from "../apiCalls/apiCalls";
import Card from '../Card/Card';
import Container from '../Container/Container';
import Saved from '../Saved/Saved';
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

// function Home() {
//   const [jokes, setJokes] = useState([])
//   const [favorites, setFavorites] = useState([])
//   const [error, setError] = useState('')

//   const getJoke = async () => {
//     const url = "https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&amount=3"
//     setError('')

//     try {
//       const response = await fetch(url)
//       const jokes = await response.json()
//       setJokes(jokes)
//       console.log(jokes)
//     } catch(error) {
//       setError(error.message)
//     }
//   }

//   useEffect(() => {
//     getJoke()
//   }, [jokes])

//   function saveCard(id) {
//     console.log("click", id);
//     const newFavorite = jokes.find((joke) => joke.id === id);
//     if (!favorites.includes(newFavorite)) {
//       setFavorites(newFavorite)
//       // favorites.push(newFavorite);
//       console.log(this.state.favorites);
//     } else {
//       return console.log("NO");
//     }
//   };

//     return (
//       <div>
//         <h2>Home component</h2>
//         <Container jokeSlips={jokes} saveCard={saveCard} />
//         <Container jokeSlips={favorites} />
//       </div>
//     );
// }
export default Home;