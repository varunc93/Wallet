import * as firebase from 'firebase';

// Initialize Firebase
const config = {
    apiKey: "AIzaSyBF_DWnw2vowwmo53r3xM2tlrfPchzK4nk",
    authDomain: "wallet-20ddc.firebaseapp.com",
    databaseURL: "https://wallet-20ddc.firebaseio.com",
    projectId: "wallet-20ddc",
    storageBucket: "wallet-20ddc.appspot.com",
    messagingSenderId: "650125595051"
  };


firebase.initializeApp(config);

const database = firebase.database();


// database.ref().set({ //ref() references the root, set will set the value
//     name: "VC",
//     age: 25,
//     isSingle: false,
//     location: {
//         city: 'Chicago',
//         country: 'US'
//     }
// }).then(() => {
//     console.log("Data is saved!");
// }).catch((error) => {
//     console.log("This failed.", error);
// });

// database.ref().remove().then().catch((error) => {console.log("Error", error)});

// database.ref("attribute").set({ //adds a new attribute to the already existing object
//         height: 27,
//         weight: 12
// }).then(() => {

// }).catch((error) => {
//     console.log("This failed.", error);
// });

// database.ref().set("Resets the current object value to this string");

// database.ref().update({ //Always takes an object
//     name: "VC",
//     isSingle: true,
//     sex: "M",
//     'location/city': null
// });

const valueChange = database.ref().once('value').then((snapshot) => {//listens for cata only once
    const val = snapshot.val();
    console.log(val);
}).catch((error) => {console.log("Error", error)});

database.ref().on('value', (snapshot) => {
    console.log(snapshot.val());
}, (error) => { console.log("Error: " , error)}); //Keeps listening for changes to the database reference. No promises used since error can be printed multiple times.

database.ref().off(valueChange); //Cancels subscription to valueChange only. If off() does not have arguments then all subscriptions are cancelled.

