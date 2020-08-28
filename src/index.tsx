import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import {
  Router, Route, Switch, Redirect, Link, RouteComponentProps,
} from 'react-router-dom';
import { createBrowserHistory } from 'history';
import * as firebase from 'firebase';
import 'firebase/auth';

import { IndexRoutes } from './routers';
import NotFound from './views/NotFound/NotFound';
import './styles/style.scss';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBrcp1E1-CAsXa1fdBkLmi9CgVNZuro3W4',
  authDomain: 'tough-variety-286312.firebaseapp.com',
  databaseURL: 'https://tough-variety-286312.firebaseio.com',
  projectId: 'tough-variety-286312',
  storageBucket: 'tough-variety-286312.appspot.com',
  messagingSenderId: '94404888494',
  appId: '1:94404888494:web:39d7f014eb0ab6c99d6a3f',
};
// Initialize Firebase
if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);

const hist = createBrowserHistory();
ReactDOM.render(
  <Router history={hist}>
    <div className="body" key="mainBody" id="grid">
      <header className="navbar logo">
        <Link className="references" to="/news">News</Link>
        <Link className="references" to="/profile">Profile</Link>
        <Link className="references" to="/login">Login</Link>
      </header>
      <main>
        <Switch>
          {IndexRoutes.map((route) => {
            if (route.params === undefined) {
              return (
                <Route exact path={route.path} component={route.component} key={route.id} />
              );
            }
            return <PropsRoute {...route} key={route.id} />;
          })}
          <Route path="" component={NotFound} />
        </Switch>
      </main>
      <footer><span>copyright &#xa9; 2020 by Filonenko Alexej</span></footer>
    </div>
  </Router>,
  document.getElementById('root'),
);

function PropsRoute(props: any) {
  const {
    params, path, ...rest
  } = props;
  return (
    <Route
      exact
      path={path}
      render={() => (
        <props.component {...params} {...rest} routes={props.routes} />
      )}
    />
  );
}
