import React, { useState, useEffect, MouseEvent } from 'react';
import * as firebase from 'firebase';
import 'firebase/auth';
import GoogleIcon from './icon';
import { checkLoginStatus } from '../userStatus';

export const LoginForm = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  let token = '';
  const checkLoginStatusReactSide = async () => {
    try {
      const user = await checkLoginStatus();
      if (user) {
        setIsLoggedIn(true);
      }
    } catch (err) {
      setIsLoggedIn(false);
    }
  };
  checkLoginStatusReactSide();

  function signIn(e: MouseEvent) {
    if (e) {
      e.preventDefault();
    }
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then((result) => {
      if (result) {
        const credential = result.credential as firebase.auth.OAuthCredential;
        if (credential.accessToken) token = credential.accessToken;
        setIsLoggedIn(true);
        const { user } = result;
      }
    }).catch((error) => {
      throw error;
    });
  }

  function signOut(e: MouseEvent) {
    if (e) {
      e.preventDefault();
    }
    firebase.auth().signOut().then(() => {
      setIsLoggedIn(false);
    }).catch((error) => {
      throw error;
    });
  }

  return (
    <div className="loginForm">
      <h1>Login form</h1>
      <button key="Login" type="button" onClick={signIn} disabled={isLoggedIn}>
        <GoogleIcon />Sign in with Google
      </button>
      <button key="Logout" type="button" onClick={signOut} disabled={!isLoggedIn}>
        <GoogleIcon />Sign out
      </button>
    </div>
  );
};
