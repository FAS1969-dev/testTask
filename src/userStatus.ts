import 'firebase/auth';
import firebase from 'firebase';

function checkLoginStatus() {
  return new Promise((resolve, reject) => {
    try {
      firebase.auth().onAuthStateChanged((user) => resolve(user));
    } catch (err) {
      reject(err);
    }
  });
}

export { checkLoginStatus };
