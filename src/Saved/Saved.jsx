
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
      top: "19%",
      left: "71%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-92%, -22%)",
      background: "#b3c6ff",
      opacity: "95%",
    },
  };

  var subtitle;
  const [modalIsOpen, setIsOpen] = useState(false)
  const [ favorites, setFavorites ] = useState([])
  const [error, setError] = useState('')
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
    subtitle.style.color = 'red'
  }

  function closeModal() {
    setIsOpen(false)
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
          <h2 ref={(_subtitle) => (subtitle = _subtitle)}>
            Add a new joke here
          </h2>
          <form>
              <textarea
                className='text-area'
                type="text"
                wrap="soft"
                placeholder="Add joke here"
                name="newJoke"
                value={newJoke}
                onChange={(event) => setNewJoke(event.target.value)}
              />
              <Button
                className='save-button'
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
                className="close-button"
                variant="contained"
                color="primary"
                onClick={closeModal}
              >
                CLOSE
              </Button>
          </form>
        </Modal>
        <div className="spacer"></div>
        <h2 className='header' >My favorite jokes</h2>
        {!favorites.length && <h2>You do not have any saved jokes.</h2>}
        <Container jokeSlips={favorites} deleteJoke={deleteJoke} />
      </div>
    );
}

Saved.propTypes = {
  favorites: PropTypes.array,
}

export default Saved;