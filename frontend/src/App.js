import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import UserProvider from "./firebase/UserProvider";
import NewsAndSchemes from "./Components/NewsAndSchemes/NewsAndSchemes";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import PricePrediction from "./Components/PricePrediction/PricePrediction";

function App() {
  return (
    <UserProvider>
      <div className="App">
        <Navbar />
        <NewsAndSchemes />
        <Router>
          <Switch>
            <Route path="/PricePrediction">
              <PricePrediction />
            </Route>
          </Switch>
        </Router>
      </div>
    </UserProvider>
  );
}

export default App;
