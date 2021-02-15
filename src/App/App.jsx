
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "../home/Home";
import React from "react";
import Saved from "../saved/Saved";
import Header from '../header/Header';



function App() {
  return (
    <section className="App">
      <div style={{marginTop: "10em"}}>
        <Header />
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