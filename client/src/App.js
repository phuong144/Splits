import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route} from "react-router-dom";

import HomePage from "./components/homepage.component";
import SignIn from "./components/signin.component";
import SignUp from "./components/signup.component";

function App() {
  return (
    <Router>
      <Route exact path="/" component={SignIn} />
      <Route path="/home" component={HomePage} />
      <Route path="/signup" component={SignUp} />
    </Router>
    

  );
}

export default App;
