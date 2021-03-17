import firebase from "firebase";

// Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyDVCweL6mS6oBQQo_N8UkC38Gc70osZZ5Q",
    authDomain: "bt3103-finalproject.firebaseapp.com",
    projectId: "bt3103-finalproject",
    storageBucket: "bt3103-finalproject.appspot.com",
    messagingSenderId: "154283137147",
    appId: "1:154283137147:web:db05648c55c5a468556ade",
    measurementId: "G-E80P9W6FDE"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  var database = firebase.firestore();
  export default database;