
import React, { Component } from 'react';
import { getAllFavorites } from '../apiCalls/apiCalls'

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

  render() {
    return(
      <h2>Favorites</h2>
    )
  }
}

export default Saved;