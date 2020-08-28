import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import * as firebase from 'firebase';
import 'firebase/auth';
import { checkLoginStatus } from '../userStatus';

const Profile: React.SFC = () => {
  const checkLoginStatusReactSide = async () => {
    const user = await checkLoginStatus();
  };
  checkLoginStatusReactSide();
  const userInfo = firebase.auth().currentUser;
  if (userInfo) {
    return (
      <div className="Profile">
        <h1> User profiles </h1>
        <ul>
          <ol><strong>Full name:</strong> <span>{userInfo?.displayName}</span></ol>
          <ol><strong>E-mail:</strong> <span>{userInfo?.email}</span></ol>
          <ol><strong>E-mail(verified):</strong> <span>{userInfo?.emailVerified}</span></ol>
          <ol><strong>Phone number:</strong> <span>{userInfo?.phoneNumber}</span></ol>
          <ol><img src={userInfo.photoURL ? userInfo?.photoURL : ''} className="user-img" /></ol>
        </ul>
      </div>
    );
  }
  return <Redirect to="/login" />;
};
export { Profile };
