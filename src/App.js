// App.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import Routes from "./routes/Routes";
import AuthContext from "./components/context/AuthContext";
import { Provider } from "react-redux";
import store from "./store";


axios.defaults.baseURL = "https://propel-x-server.vercel.app/api";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("auth-token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      <Provider store={store}>
        <Routes />
      </Provider>
    </AuthContext.Provider>
  );
};

export default App;
