
export const getJoke = async () => {
  const response = await fetch(
    "https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&amount=3"
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