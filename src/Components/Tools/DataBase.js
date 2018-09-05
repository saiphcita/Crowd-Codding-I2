import firebase  from 'firebase/app';
import 'firebase/database';

const config = {
    apiKey: "AIzaSyAIlpA6hA6colHLJZRQhPhJPtsa2cxTNeo",
    authDomain: "crowd-coddingi2.firebaseapp.com",
    databaseURL: "https://crowd-coddingi2.firebaseio.com",
    projectId: "crowd-coddingi2",
    storageBucket: "crowd-coddingi2.appspot.com",
    messagingSenderId: "620217850449"
};
const app = firebase.initializeApp(config);
const db = app.database()

var refGeneralCategory = db.ref("CategoryAndPost/Category");
var refGeneralPosts = db.ref("CategoryAndPost/Post");
var refAllUsers = db.ref("Users");

//example user
var dbUser = db

export { refGeneralCategory, refGeneralPosts, refAllUsers, dbUser}