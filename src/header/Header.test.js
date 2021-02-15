import { screen, render, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import Header from './Header.jsx'

describe("Header", () => {
  it('should render the title of the site', () => {
    render(
      <Header />
    )
    expect(screen.getByText("Funny-Dev")).toBeInTheDocument()
  })
})
