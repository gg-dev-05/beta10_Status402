import "./App.css";
import React from "react";
import UserProvider from "./firebase/UserProvider";

function App() {
  return (
    <UserProvider>
      <div className="App"></div>
    </UserProvider>
  );
}

export default App;
