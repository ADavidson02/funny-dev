import { screen, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Card from './Card';
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

describe('Card', () => {
  it('should render a jokeSlip', () => {
    const mockJokeSlip = {
      id: 26,
      joke: '!False',
    }
    const mockSave = jest.fn()
    render(
      <Card 
      id={mockJokeSlip.id} 
      joke={mockJokeSlip.joke} 
      saveCard={mockSave} />
    );
      
      expect(screen.getByText('!False')).toBeInTheDocument();
      const saveButton = screen.getByRole("checkbox", { name: /save button/i })
      expect(saveButton).toBeInTheDocument()
    })
    
  // it('should render with a delete button', () => {
  //   const history = createMemoryHistory();
  //   const route = "/favorites";
  //   history.push(route)
  //   const mockJokeSlip2 = {
  //     id: 26,
  //     joke: '!True',
  //     deleteJoke: jest.fn()
  //   }

  //   render(
  //     <Router history={history}>
  //     <Card 
  //     id={mockJokeSlip2.id}
  //     joke={mockJokeSlip2.joke}
  //     deleteJoke={mockJokeSlip2.deleteJoke}
  //     />
  //     </Router>
  //   )
  //   screen.debug()
  //   expect(screen.getByText("!True")).toBeInTheDocument();
  //   const deleteButton = screen.getByRole("button", { name: /delete\-button/i })
  //   expect(deleteButton).toBeInTheDocument
  // })
})