import { screen, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Card from './Card';
import { Router, MemoryRouter, BrowserRouter } from "react-router-dom";
import { createMemoryHistory } from "history";
const renderWithRouter = (ui, {route = '/favorites'} = {}) => {
  window.history.pushState({}, 'favorites', route)
  return render(
    ui, {wrapper: BrowserRouter}
  )
}

describe('Card', () => {
  it('should render a jokeSlip', () => {
    const mockJokeSlip = {
      id: 26,
      joke: 'Why pink',
    };
    const mockSave = jest.fn();
    render(
      <Card
        id={mockJokeSlip.id}
        joke={mockJokeSlip.joke}
        saveCard={mockSave}
      />
    );

    expect(screen.getByText('Why pink')).toBeInTheDocument();
  }),

  it('should render a save button', () => {
    const mockJokeSlip = {
      id: 26,
      joke: '!False',
    };
    const mockSave = jest.fn();
    render(
      <Card
        id={mockJokeSlip.id}
        joke={mockJokeSlip.joke}
        saveCard={mockSave}
      />
    );
    const saveButton = screen.getByTestId("save-button");
    expect(screen.getByText("!False")).toBeInTheDocument();
    expect(saveButton).toBeInTheDocument();
  }),

  it("should render with a delete button", () => {
    const mockJokeSlip2 = {
      id: 26,
      joke: "!True",
      deleteJoke: jest.fn(),
    };
    renderWithRouter(
      <Card
        id={mockJokeSlip2.id}
        joke={mockJokeSlip2.joke}
        deleteJoke={mockJokeSlip2.deleteJoke}
      />,
      { route: "/favorites" }
    );

    expect(screen.getByText("!True")).toBeInTheDocument();
    const deleteButton = screen.getByTestId("delete");
    expect(deleteButton).toBeInTheDocument();
  });
})