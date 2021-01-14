
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './Home/Home';
import React from "react";
import Saved from './Saved/Saved';



function App() {
  return (
    <section className='App'>
      <div>
        <Router>
          <Switch>
            <Route path='/favorites' component={Saved} />
            <Route exact path="/" component={Home} />
          </Switch>
        </Router>
      </div>
    </section>
  );
}

export default App;

// import { getJoke } from "./apiCalls/apiCalls";
// import Card from "./Card/Card";


// class App extends Component {
//   constructor() {
//     super();
//     this.state = {
//       jokes: [],
//       favorites: [],
//     };
//   }

//   componentDidMount = async () => {
//     const fetchedJoke = await getJoke();
//     this.setState({ jokes: fetchedJoke.jokes });
//   };

//   saveCard = (id) => {
//     // console.log("click", id);
//     console.log('id', this.state.favorites.id);
//     const newFavorite = this.state.jokes.find((joke) => joke.id === id);
//     if (!this.state.favorites.id.includes(newFavorite.id)) {
//       this.state.favorites.push(newFavorite);
//     } else {
//       return console.log("NO");
//     }
//   };

//   render() {
//       return (
//     <section className='app'>
//       <div>
//         <Router>
//           <Switch>
//             <Route path='/favorites' render={props => {
//               <Container jokeSlips={this.state.favorites} />
//             }} />
//             <Route exact path="/" render={props => {
//               <Container jokeSlips={this.state.jokes} saveCard={this.saveCard} {...props} />
//             }} 
//             />
//           </Switch>
//         </Router>
//       </div>
//     </section>
//     )
//   }
// }
  

// export default Home;
