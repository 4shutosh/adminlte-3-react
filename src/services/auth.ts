import {removeWindowClass} from '@app/utils/helpers';
import {Gatekeeper} from 'gatekeeper-client-sdk';
import dotenv from 'dotenv';
import {initializeApp} from 'firebase/app';
import * as firebaseAuth from 'firebase/auth';
import axios from 'axios';
import {User} from 'firebase/auth';

dotenv.config();
initializeApp({
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
});

export const loginByAuth = async (email: string, password: string) => {
  const token = await Gatekeeper.loginByAuth(email, password);
  localStorage.setItem('token', token);
  removeWindowClass('login-page');
  removeWindowClass('hold-transition');
  return token;
};

export const registerByAuth = async (email: string, password: string) => {
  const token = await Gatekeeper.registerByAuth(email, password);
  localStorage.setItem('token', token);
  removeWindowClass('register-page');
  removeWindowClass('hold-transition');
  return token;
};

export const loginByGoogle = async () => {
  const token = await Gatekeeper.loginByGoogle();
  localStorage.setItem('token', token);
  removeWindowClass('login-page');
  removeWindowClass('hold-transition');
  return token;
};

const firebaseGoogleProvider = new firebaseAuth.GoogleAuthProvider();
export const loginByFirebaseAndAPI = async () => {
  const response = await firebaseAuth
    .signInWithPopup(firebaseAuth.getAuth(), firebaseGoogleProvider)
    .then((result) => {
      const loggedInUser = result.user;
      console.log('GLogin Success, hitting API now!');
      return loginCollegeAPI(loggedInUser);
    })
    .catch((error) => {
      console.log(error.message);
      alert(error.message);
    });
  return response;
};

async function loginCollegeAPI(loggedInUser: User) {
  const userResponse = await axios
    .post(
      `${process.env.REACT_APP_BASE_API_URL}/login?email=${loggedInUser.email}&name=${loggedInUser.displayName}&imageUrl=${loggedInUser.photoURL}`
    )
    .then((response) => response.data)
    .then((data) => {
      localStorage.setItem('token', data.accessToken);
      return data;
    })
    .catch((error) => {
      console.error(error);
    });
  return userResponse;
}

export const registerByGoogle = async () => {
  const token = await Gatekeeper.registerByGoogle();
  localStorage.setItem('token', token);
  removeWindowClass('register-page');
  removeWindowClass('hold-transition');
  return token;
};

export const loginByFacebook = async () => {
  const token = await Gatekeeper.loginByFacebook();
  localStorage.setItem('token', token);
  removeWindowClass('login-page');
  removeWindowClass('hold-transition');
  return token;
};

export const registerByFacebook = async () => {
  const token = await Gatekeeper.registerByFacebook();
  localStorage.setItem('token', token);
  removeWindowClass('register-page');
  removeWindowClass('hold-transition');
  return token;
};
