import { screen, render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from './Home';
import { MemoryRouter, Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { getJoke } from '../apiCalls/apiCalls';
jest.mock('../apiCalls/apiCalls');

describe('Home', () => {
  it('should render joke slips', async () => {
    const history = createMemoryHistory()
    const mockJokeSlips = [
      { id: 22, joke: "Joke one" },
      { id: 24, joke: "Joke two" }
    ]
    getJoke.mockResolvedValue({jokes: mockJokeSlips});
    render(
      <Router history={history}>
        <Home />
      </Router>
    )
    const mockJokeOne = await waitFor(() => screen.getByText('Joke one'))
    const mockJokeTwo = await waitFor(() => screen.getByText('Joke two'))
    expect(mockJokeOne).toBeInTheDocument()
    expect(mockJokeTwo).toBeInTheDocument()
  })
})