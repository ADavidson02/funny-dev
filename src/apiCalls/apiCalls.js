
export const getJoke = async () => {
  const response = await fetch(
    "https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single&amount=2"
  );
  if(response.status >= 200 && response.status <=299 ) {
    const jsonResponse = await response.json();
    return jsonResponse
  } else {
    console.log(`Error! Code: ${response.status} There seems to be a problem with the server. Please refresh the page.`
    );
    return response.status;
  }
}

export const getAllFavorites = async () => {
  const response = await fetch("http://localhost:3001/api/v1/favorites");
  if(response.status >= 200 && response.status <= 299 ) {
    const jsonResponse = response.json();
    return jsonResponse;
  } else {
    console.log(`Error code ${response.status}`)
    return response.status
  }
}

export const addNewFavorite = (id, joke) => {
  return fetch("http://localhost:3001/api/v1/favorites", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
       id: id,
       joke: joke
    }),
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.log(error))
}

export const removeJoke = (id) => {
  return fetch(`http://localhost:3001/api/v1/favorites/${id}`, {
    method: "DELETE"
  })
    .then((response) => response.json())
    .then((result) => console.log("result", result))
    .catch((error) => console.log(error));
}