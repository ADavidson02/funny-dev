
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "../Home/Home";
import React from "react";
import Saved from "../Saved/Saved";
import Title from "../Title/Title"

function App() {
  return (
    <section className="App">
      <div style={{marginTop: '8em'}}>
        <Title />
      </div>
      <div>
        <Router>
          <Switch>
            <Route path="/favorites" component={Saved} />
            <Route exact path="/" component={Home} />
          </Switch>
        </Router>
      </div>
    </section>
  );
}

export default App;