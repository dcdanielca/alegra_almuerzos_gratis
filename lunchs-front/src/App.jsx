import { Switch, Route, Link } from 'react-router-dom';
import Recipes from './pages/Recipes';
import Home from './pages/Home';
import Store from './pages/Store';


import './index.css';

function App() {
  return (
    <div className="App">
      <header className="bg-blue-800 mb-10 sticky top-0">
        <ul className="flex items-center justify-between flex-wrap-500 p-6 text-xl">
          <li className="mr-6 pl-40">
            <Link className="text-white mr-6 hover:underline hover:text-blue-200" to="/">Home</Link>
            <Link className="text-white mr-6 hover:underline hover:text-blue-200" to="/recipes">Recipes</Link>
            <Link className="text-white mr-6 hover:underline hover:text-blue-200" to="/store">Store</Link>
          </li>
        </ul>
      </header>

        <Switch>
        <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/recipes">
            <Recipes />
          </Route>
          <Route exact path="/store">
            <Store />
          </Route>
        </Switch>
    </div>
  );
}

export default App;
