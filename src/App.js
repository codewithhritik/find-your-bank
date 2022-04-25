import "./App.css";
import Banks from "./components/banks/Banks";
import Navbar from "./components/Navbar";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import BankDetails from "./pages/BankDetails";
import Error from "./pages/Error";

function App() {
  return (
    <div>
      <Navbar />
      <div>
        <Router>
          <Switch>
            <Route path="/all-banks" component={Banks} exact />
            <Route path="/bank-details/:ifsc" component={BankDetails} exact />
            <Route exact path="/">
              <Redirect to="/all-banks" />
            </Route>
            <Route component={Error} />
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
