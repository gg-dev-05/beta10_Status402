import './App.css';
import Navbar from './components/Navbar/Navbar';
import NewsAndSchemes from './components/NewsAndSchemes/NewsAndSchemes';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import PricePrediction from './components/PricePrediction/PricePrediction';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <NewsAndSchemes/>
      <Router>
      <Switch>
          <Route path="/PricePrediction">
            <PricePrediction />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
