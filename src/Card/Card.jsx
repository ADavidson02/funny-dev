
import React, { useState } from 'react';
import './Card.css';
import { Button, Checkbox, FormControlLabel } from '@material-ui/core';
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import DeleteIcon from "@material-ui/icons/Delete";
import FavoriteIcon from "@material-ui/icons/Favorite";
import PropTypes from 'prop-types';

const Card = ({id, joke, saveCard, deleteJoke }) => {
  const pathname = window.location.pathname;
  const [checked, setChecked] = useState(false)

  return (
    <section className="joke-card">
      {pathname === "/" ? (
        <FormControlLabel
          control={
            <Checkbox
              checked={checked}
              onChange={(e) => setChecked(e.target.checked)}
              inputProps={{ "aria-label": "save button" }}
              icon={<FavoriteBorderIcon />}
              checkedIcon={<FavoriteIcon />}
              onClick={() => saveCard(id)}
            />
          }
          className="love-button"
        >
          save
        </FormControlLabel>
      ) : (
        <Button
          startIcon={<DeleteIcon />}
          onClick={() => deleteJoke(id)}
        ></Button>
      )}
      <p key={id}>
        <h3>{joke}</h3>
      </p>
    </section>
  );
}

Card.propTypes = {
  id: PropTypes.number,
  joke: PropTypes.string,
  saveCard: PropTypes.func,
  deleteJoke: PropTypes.func
}

export default Card;
