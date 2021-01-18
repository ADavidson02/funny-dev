
import React, { useState, useEffect } from 'react';
import { getAllFavorites, removeJoke, addNewFavorite  } from '../apiCalls/apiCalls';
import './Saved.css';
import Container from '../Container/Container';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import { Button, ButtonGroup } from "@material-ui/core";
import PropTypes from 'prop-types';
import SaveIcon from "@material-ui/icons/Save";
Modal.setAppElement("body");


function Saved() {
  const customStyles = {
    content: {
      top: "36%",
      left: "67%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-83%, -45%)",
      background: 'rgb(78 127 144)',
      opacity: "90%",
    },
  };

  var subtitle;
  const [jokeModalIsOpen, setJokeModalIsOpen] = useState(false)
  const [ favorites, setFavorites ] = useState([])
  const [error, setError] = useState('')
  const [newJoke, setNewJoke] = useState('')
  const [inputError, setInputError] = useState(false)

  const submitJoke = event => {
    event.preventDefault()
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
    closeJokeModal()
  }

  const addNewUserJoke = (userJoke) => {
    setFavorites([...favorites, userJoke])
  }

  const cleanInputs = () => {
    setNewJoke('')
  }

  function openJokeModal() {
    setJokeModalIsOpen(true)
  }

  function afterOpenJokeModal() {
    subtitle.style.color = 'white'
  }

  function closeJokeModal() {
    setJokeModalIsOpen(false)
  }

  const getFavorites = async () => {
    try{
      const favorites = await getAllFavorites()
      setFavorites(favorites)
    } catch (error) {
      setError(error.message)
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
        <h2 className='header' >My favorite jokes</h2>
        <Link to="/">
          <Button aria-label="home" variant="contained" color="secondary">
            Home
          </Button>
        </Link>
        <Button variant="contained" color="primary" onClick={openJokeModal}>
          Add a joke
        </Button>
        <Button variant='contained' color='secondary' />
        <Modal
          isOpen={jokeModalIsOpen}
          onAfterOpen={afterOpenJokeModal}
          onRequestClose={closeJokeModal}
          style={customStyles}
          contentLabel="Add joke modal"
        >
          <h2 ref={(_subtitle) => (subtitle = _subtitle)}>
            Add a new joke here
          </h2>
          <form>
              <textarea
                className='text-area'
                type="text"
                wrap="soft"
                style={{fontSize: 20}}
                placeholder="Add joke here"
                name="newJoke"
                value={newJoke}
                onChange={(event) => setNewJoke(event.target.value)}
              />
              <Button
                className='modal-buttons'
                variant="contained"
                color="secondary"
                icon={<SaveIcon />}
                onClick={submitJoke}
              >
                Save joke
              </Button>
              {inputError === true && (
                <h2>Please add joke before submitting</h2>
              )}
              <Button
                className="modal-buttons"
                variant="contained"
                color="primary"
                onClick={closeJokeModal}
              >
                CLOSE
              </Button>
          </form>
        </Modal>
        <div className="spacer"></div>
        {!favorites.length && <h2>You do not have any saved jokes.</h2>}
        <Container jokeSlips={favorites} deleteJoke={deleteJoke} />
      </div>
    );
}

Saved.propTypes = {
  favorites: PropTypes.array,
}

export default Saved;