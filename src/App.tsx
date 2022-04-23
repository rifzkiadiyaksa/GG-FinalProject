import React from 'react';
import * as reactRedux from 'react-redux';
import {
  Redirect,
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import './App.css';
import Login from './pages/Login';
import CreatePlaylist from './pages/CreatePlaylist';
import { RootState } from './redux/store';

function App() {
  const isAuthorized: boolean = reactRedux.useSelector(
    (state: RootState) => state.auth.isAuthorized
  );

  return (
    <Router>
      <Switch>
        <Route path="/create-playlist" exact>
          {isAuthorized ? <CreatePlaylist /> : <Redirect to="/" />}
        </Route>
        <Route path="/" exact>
          <Login />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
