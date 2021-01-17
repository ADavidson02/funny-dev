
import React, { useEffect, useState } from 'react';
import './Card.css';
import { Button, Checkbox, FormControlLabel } from '@material-ui/core';
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import DeleteIcon from "@material-ui/icons/Delete";
import FavoriteIcon from "@material-ui/icons/Favorite";

const Card = ({id, joke, saveCard, deleteJoke }) => {
  const pathname = window.location.pathname;
  const [checked, setChecked] = useState(false)

  return (
    <section className="joke-card">
      {pathname === "/" ? (
        <FormControlLabel
          control={<Checkbox
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
          inputProps={{'aria-label': 'save button'}}
          icon={<FavoriteBorderIcon />}
          checkedIcon={<FavoriteIcon />}
          onClick={() => saveCard(id)}
        />}
          className="love-button"
        >
          save
        </ FormControlLabel>
      ) : (
        <Button startIcon={<DeleteIcon />} onClick={() => deleteJoke(id)}>
        </Button>
      )}
      <article key={id}>
        <h3>{joke}</h3>
      </article>
    </section>
  );
}

export default Card;