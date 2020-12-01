import { useState } from "react";
import { Container, Row } from "reactstrap";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useHistory,
} from "react-router-dom";

import "./App.css";
import { UserContext } from "./Context/User";
import TopBar from "./Components/TopBar";
import SideBar from "./Components/SideBar";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Dashboard from "./Components/Dashboard";

function App() {
  const [user, setUser] = useState({
    jobs: [],
    companyList: [],
  });

  return (
    <Router>
      <div className="d-flex" id="wrapper">
        <SideBar />
        <div id="page-content-wrapper">
          <TopBar />
          <Container>
            <Row>
              <UserContext.Provider value={{ user, setUser }}>
                <Route path="/login">
                  <Login />
                </Route>
                <Route path="/register">
                  <Register />
                </Route>
                <Route path="/dashboard">
                  {user.loggedIn ? <Dashboard /> : <Redirect to="login" />}
                </Route>
              </UserContext.Provider>
            </Row>
          </Container>
        </div>
      </div>
    </Router>
  );
}

export default App;
