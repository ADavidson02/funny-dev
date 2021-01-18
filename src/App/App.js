
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "../Home/Home";
import React from "react";
import Saved from "../Saved/Saved";


function App() {
  return (
    <section className="App">
      <div>
        <h2 className="App-header">Funny-Dev</h2>
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