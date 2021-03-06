import { screen, render, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import Saved from './Saved.jsx';
import useEvent from '@testing-library/user-event';
import { BrowserRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import {
  getAllFavorites,
  removeJoke,
  addNewFavorite,
} from '../apiCalls/apiCalls';
jest.mock('../apiCalls/apiCalls');
import userEvent from '@testing-library/user-event';
const renderWithRouter = (ui, { route = '/favorites' } = {}) => {
  window.history.pushState({}, 'favorites', route);
  return render(ui, { wrapper: BrowserRouter });
};

describe('Saved', () => {
  it("should render joke cards", async () => {
    const history = createMemoryHistory();
    getAllFavorites.mockResolvedValue([
      { id: 22, joke: "Joke three" },
      { id: 24, joke: "Joke four" },
      { id: 26, joke: "Joke five" },
    ]);
    render(
      <Router history={history}>
        <Saved />
      </Router>
    );
    const mockJokeThree = await waitFor(() => screen.getByText("Joke three"));
    const mockJokeFour = await waitFor(() => screen.getByText("Joke four"));
    const mockJokeFive = await waitFor(() => screen.getByText("Joke five"));

    expect(screen.getByText("My favorite jokes")).toBeInTheDocument();
    expect(mockJokeThree).toBeInTheDocument();
    expect(mockJokeFour).toBeInTheDocument();
    expect(mockJokeFive).toBeInTheDocument();
  }),

  it("should render a delete button", async () => {
    const history = createMemoryHistory();
    getAllFavorites.mockResolvedValue([{ id: 22, joke: "Joke six" }]);
    await act(async () => {
      renderWithRouter(
        <Router history={history}>
          <Saved />
        </Router>,
        { route: "/favorites" }
      );
    });

    expect(screen.getByText("Joke six")).toBeInTheDocument();
    const deleteButton = screen.getByTestId("delete");
    expect(deleteButton).toBeInTheDocument();
  }),

  it("should show a add joke modal", async () => {
    const history = createMemoryHistory();
    getAllFavorites.mockResolvedValue([{ id: 22, joke: "Joke six" }]);
    await act(async () => {
      renderWithRouter(
        <Router history={history}>
          <Saved />
        </Router>,
        { route: "/favorites" }
      );
    });
    const addJokeModal = screen.getByText("Add a joke");
    userEvent.click(addJokeModal);
    expect(screen.getByText("Add a new joke here")).toBeInTheDocument();
  }),

  it("should show an error message when input is empty", async () => {
    const history = createMemoryHistory();
    getAllFavorites.mockResolvedValue([{ id: 22, joke: "Joke six" }]);
    await act(async () => {
      renderWithRouter(
        <Router history={history}>
          <Saved />
        </Router>,
        { route: "/favorites" }
      );
    });
    const addJokeModal = screen.getByText("Add a joke");
    userEvent.click(addJokeModal);
    expect(screen.getByText("Add a new joke here")).toBeInTheDocument();
    const addNewJokeButton = screen.getByText("Save joke");
    userEvent.click(addNewJokeButton);
    expect(
      screen.getByText("Please add joke before submitting")
    ).toBeInTheDocument();
  }),

  it("should take in a new joke", async () => {
    const history = createMemoryHistory();
    getAllFavorites.mockResolvedValue([{ id: 22, joke: "Joke six" }]);
    await act(async () => {
      renderWithRouter(
        <Router history={history}>
          <Saved />
        </Router>,
        { route: "/favorites" }
      );
    });
    const addJokeModal = screen.getByText("Add a joke")
    userEvent.click(addJokeModal)
    expect(screen.getByText("Add a new joke here")).toBeInTheDocument()
    const addNewJokeButton = screen.getByText("Save joke")
    userEvent.type(screen.getByPlaceholderText("Add joke here"), "Why did the chicken cluck")
    userEvent.click(addNewJokeButton)
    await waitFor(() => 
      expect(screen.queryByText("Add a joke here")).not.toBeInTheDocument()
    )
    expect(screen.getByText("Why did the chicken cluck")).toBeInTheDocument()
  }),

  it('should remove a joke when the delete button is pressed', async () => {
    const history = createMemoryHistory();
    getAllFavorites.mockResolvedValue([
      { id: 22, joke: "Joke nine" }
    ]);
    await act(async () => {
      renderWithRouter(
        <Router history={history}>
          <Saved />
        </Router>,
        { route: "/favorites" }
      )
    })
    const foundJoke = screen.getByText("Joke nine")
    expect(foundJoke).toBeInTheDocument();
    const deleteButton = screen.getByTestId("delete");
    expect(deleteButton).toBeInTheDocument();
    userEvent.click(deleteButton)
    await waitFor(() => 
      expect(foundJoke).not.toBeInTheDocument())
  }),

  it("should show a message when no jokes are saved", async () => {
    const history = createMemoryHistory();
    getAllFavorites.mockResolvedValue([])
    await act(async () => {
      renderWithRouter(
        <Router history={history}>
          <Saved />
        </Router>,
        {route: '/favorites'}
      )
    })

    expect(screen.getByText("You do not have any saved jokes.")).toBeInTheDocument()
  }),

  it("should show a search modal", async () => {
    const history = createMemoryHistory();
    getAllFavorites.mockResolvedValue([{ id: 22, joke: "Joke six" }]);
    await act(async () => {
      renderWithRouter(
        <Router history={history}>
          <Saved />
        </Router>,
        { route: "/favorites" }
      );
    });

    const searchModal = screen.getByText("Search");
    userEvent.click(searchModal);

    expect(screen.getByText("Search for a joke here")).toBeInTheDocument();
  }),

    it("should show a list of jokes that include the search word", async () => {
    const history = createMemoryHistory();
    getAllFavorites.mockResolvedValue([
      { id: 22, joke: "Joke six" },
      { id: 28, joke: "Joke eleven"}
    ]);
    await act(async () => {
      renderWithRouter(
        <Router history={history}>
          <Saved />
        </Router>,
        { route: "/favorites" }
      );
    });
    const searchModal = screen.getByText("Search");
    userEvent.click(searchModal);
    expect(screen.getByText("Search for a joke here")).toBeInTheDocument();
    const searchButton = screen.getByTestId("search-button")
    userEvent.type(screen.getByPlaceholderText("Search"), "eleven")
    userEvent.click(searchButton)
    expect(screen.getByText("Joke eleven")).toBeInTheDocument()
    await waitFor(() => expect(screen.queryByText("Joke six")).not.toBeInTheDocument())
  }),
      it("should show a message when no jokes include the search word", async () => {
    const history = createMemoryHistory();
    getAllFavorites.mockResolvedValue([
      { id: 22, joke: "Joke six" },
      { id: 28, joke: "Joke eleven"}
    ]);
    await act(async () => {
      renderWithRouter(
        <Router history={history}>
          <Saved />
        </Router>,
        { route: "/favorites" }
      );
    });
    const searchModal = screen.getByText("Search");
    userEvent.click(searchModal);
    expect(screen.getByText("Search for a joke here")).toBeInTheDocument()
    const searchButton = screen.getByTestId("search-button")
    userEvent.type(screen.getByPlaceholderText("Search"), "two")
    userEvent.click(searchButton)
    expect(screen.getByTestId("search-error")).toBeInTheDocument()
  })
})
