
import React, { useState, useEffect } from 'react';
import { getAllFavorites, removeJoke, addNewFavorite  } from '../apiCalls/apiCalls';
import './Saved.css';
import Container from '../Container/Container';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import { Button } from "@material-ui/core";
Modal.setAppElement("body");



function Saved() {
  const customStyles = {
    content: {
      top: "19%",
      left: "71%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      background: "#b3c6ff",
      opacity: "100%",
    },
  };

  var subtitle;
  const [modalIsOpen, setIsOpen] = useState(false)
  const [ favorites, setFavorites ] = useState([])
  // const [error, setError] = useState('')
  const [newJoke, setNewJoke] = useState('')
  const [inputError, setInputError] = useState(false)

  const submitJoke = event => {
    event.preventDefault()
    debugger
    const newUserJoke = {
      id: Date.now(),
      joke: newJoke
    }
    if(newJoke === '') {
     return setInputError(true)
    }
    addNewUserJoke(newUserJoke)
    addNewFavorite(newUserJoke.id, newUserJoke.joke)
    cleanInputs()
    closeModal()
  }

  const addNewUserJoke = (userJoke) => {
    setFavorites([...favorites, userJoke])
  }

  const cleanInputs = () => {
    setNewJoke('')
  }

  function openModal() {
    setIsOpen(true)
  }

  function afterOpenModal() {
    subtitle.style.color = '#f00'
  }

  function closeModal(e) {
    setIsOpen(false)
    e.stopPropagation();
  }

  const getFavorites = async () => {
    try{
      const favorites = await getAllFavorites()
      setFavorites(favorites)
    } catch (error) {
      setInputError(error.message)
    }
  }

  useEffect(() => {
    getFavorites()
  }, [])


  const deleteJoke = (id) => {
    const filteredJokes = favorites.filter((joke) => joke.id !== id);
    removeJoke(id);
    setFavorites(filteredJokes)
  };

    return (
      <div className="saved">
        <Link to="/">
          <Button aria-label="home" variant="contained" color="secondary">
            Home
          </Button>
        </Link>
        <Button variant="contained" color="primary" onClick={openModal}>
          Add a joke
        </Button>
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Add joke modal"
        >
          <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Add a new joke here</h2>
          <form>
            <Button className='close-button' variant='contained' color='primary' onClick={closeModal}>CLOSE</Button>
            <input
              type="text"
              placeholder="Add joke here"
              name="newJoke"
              value={newJoke}
              onChange={(event) => setNewJoke(event.target.value)}
            />
            <button onClick={submitJoke}>Save joke</button>
            {inputError === true && <h2>Please add joke before submitting</h2>}
            <div className="spacer"></div>
          </form>
        </Modal>
        <div className="spacer"></div>
        <h2>My favorite jokes</h2>
        {!favorites.length && <h2>You do not have any saved jokes.</h2>}
        <Container jokeSlips={favorites} deleteJoke={deleteJoke} />
      </div>
    );
}

export default Saved;