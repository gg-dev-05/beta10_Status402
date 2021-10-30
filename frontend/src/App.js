import "./App.css";
import UserProvider from "./firebase/UserProvider";
import Navbar from "./Components/Navbar/Navbar";
import NewsAndSchemes from "./Components/NewsAndSchemes/NewsAndSchemes";
function App() {
  return (
    <UserProvider>
      <div className="App">
        <Navbar />
        <NewsAndSchemes />
      </div>
    </UserProvider>
  );
}

export default App;
