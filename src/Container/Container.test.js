
import { screen, render } from "@testing-library/react"
import "@testing-library/jest-dom"
import Container from "./Container"


describe("Container", () => {
  it("should render card component", () => {
    const mockJokeSlips = [{
      id: 26,
      joke: "Ducks go quack",
    },
    {
      id: 42,
      joke: "What is blue"
    }]

    const mockSave = jest.fn()
    render(
      <Container
        jokeSlips={mockJokeSlips} 
        saveCard={mockSave} 
      />
    )
    expect(screen.getByText("Ducks go quack")).toBeInTheDocument();
    expect(screen.getByText("What is blue")).toBeInTheDocument();
  })
})
