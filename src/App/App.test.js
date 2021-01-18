import { screen, render, waitFor, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import App from "./App";
import { Router, BrowserRouter } from "react-router-dom";
import {
  getJoke,
  getAllFavorites,
  removeJoke,
  addNewFavorite,
} from "../apiCalls/apiCalls";
import { createMemoryHistory } from "history";
jest.mock("../apiCalls/apiCalls");
const renderWithRouter = (ui, { route = "/" } = {}) => {
  window.history.pushState({}, "/", route);
  return render(ui, { wrapper: BrowserRouter });
};

describe("App", () => {
  it("should send user from home page to favorites page", async () => {
    const mockJokeSlips = [
      { id: 22, joke: "Joke one" },
      { id: 24, joke: "Joke two" },
    ];
    getAllFavorites.mockResolvedValue([
      { id: 22, joke: "Joke three" },
      { id: 24, joke: "Joke four" },
      { id: 26, joke: "Joke five" },
    ]);
    getJoke.mockResolvedValue({ jokes: mockJokeSlips });
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <App />
      </Router>
    );

    const favoritesLink = screen.getByText("My Favorites");
    await waitFor(() =>
      expect(screen.queryByText("Joke one")).toBeInTheDocument()
    );
    userEvent.click(favoritesLink);
    await waitFor(() =>
      expect(screen.queryByText("Joke one")).not.toBeInTheDocument()
    );
    expect(screen.getByText("My favorite jokes")).toBeInTheDocument();
  }),

  it("should add jokes to the favorites page", async () => {
    const mockSaveJoke = jest.fn()
    const saveCard = jest.fn()
    const mockJokeSlips = [
      { id: 68, joke: "Joke two" },
      { id: 46, joke: "Joke one" }
    ];

    getJoke.mockResolvedValue({ jokes: mockJokeSlips });
    getAllFavorites.mockResolvedValue([
      { id: 22, joke: "Joke three" },
      { id: 24, joke: "Joke four" },
      { id: 26, joke: "Joke five" },
    ]);
    const history = createMemoryHistory();
    await act( async () => {
      renderWithRouter(
      <Router history={history}>
        <App />
      </Router>,
      { rout: "/"}
      );
    })

    await waitFor(() =>
      expect(screen.queryByText("Joke two")).toBeInTheDocument()
    );

    const favoritesLink = screen.getByText("My Favorites");
    act(() => {
      userEvent.click(favoritesLink)
    })
    await waitFor(() => 
      expect(screen.getByText("Joke four")).toBeInTheDocument())
    await waitFor(() => 
      expect(screen.queryByText('Joke tow')).not.toBeInTheDocument())
    expect(screen.getByText("My favorite jokes")).toBeInTheDocument()
    const homeButton = screen.getByText('Home')
    userEvent.click(homeButton)
    await waitFor(() => expect(screen.getByText("Joke two")).toBeInTheDocument())
  })
})
