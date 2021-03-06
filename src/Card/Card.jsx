
import React, { useState } from "react";
import "./Card.css";
import { Button, Checkbox, FormControlLabel } from "@material-ui/core";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import DeleteIcon from "@material-ui/icons/Delete";
import FavoriteIcon from "@material-ui/icons/Favorite";
import PropTypes from "prop-types";

const Card = ({id, joke, saveCard, deleteJoke }) => {
  const pathname = window.location.pathname;
  const [checked, setChecked] = useState(false)

  return (
    <section className="joke-card">
      {pathname === "/" && (
        <FormControlLabel
          control={
            <Checkbox
              checked={checked}
              onChange={(e) => setChecked(e.target.checked)}
              inputProps={{ "aria-label": "save button" }}
              icon={<FavoriteBorderIcon />}
              checkedIcon={<FavoriteIcon />}
              data-testid="save-button"
              onClick={() => saveCard(id)}
            />
          }
          className="love-button"
        ></FormControlLabel>
      )}
      {pathname === "/favorites" && (
        <Button
          data-testid="delete"
          aria-label="delete-button"
          startIcon={<DeleteIcon />}
          onClick={() => deleteJoke(id)}
        ></Button>
      )}
      <div key={id}>
        <h3>{joke}</h3>
      </div>
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
