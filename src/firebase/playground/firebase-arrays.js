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

const ref = database.ref("expenses");

// const notes = [{ //Firebase doesn't store arrays so we need to use objects to store arrays.
//     id: 1,
//     name: "A"
// }, {
//     id: 2,
//     name: "B"
// }, {
//     id: 3,
//     name: "C"
// }];

// const firebaseNotes = {
//     notes:
//     {
//         one: {
//             name: "A"
//         },
//         two: {
//             name: "B"
//         },
//         three: {
//             name: "C"
//         }
//     }
// }

//To automate the unique id process, we can use push()
// ref.push({name: "A"});
// ref.push({name: "B"});
// ref.push({name: "C"});

// database.ref("/-LDxeX4bWg6Vn25bli_E").update({
//     name: "D"
// })

// ref.push({
//     description: "A",
//     note: "note A",
//     amount: "1",
//     createdAt: "1"
// });
// ref.push({
//     description: "B",
//     note: "note B",
//     amount: "2",
//     createdAt: "2"
// });
// ref.push({
//     description: "C",
//     note: "note C",
//     amount: "3",
//     createdAt: "3"
// });

// ref.once('value', (snapShot) => {
//     const expenses = [];
//     snapShot.forEach((childSnapShot) => {
//         expenses.push({
//             id: childSnapShot.key,
//             ...childSnapShot.val()
//         });
//     });
//     console.log(expenses);
// });
// ref.set(firebaseNotes);

// ref.on('value', (snapShot) => {
//     const expenses = [];
//     snapShot.forEach((childSnapShot) => {
//         expenses.push({
//             id: childSnapShot.key,
//             ...childSnapShot.val()
//         });
//     });
//     console.log(expenses);
// });

ref.on("child_removed", (snapShot) => {
    console.log(snapShot.key, snapShot.val());
});

ref.on("child_changed", (snapShot) => {
    console.log(snapShot.key, snapShot.val());
});

ref.on("child_added", (snapShot) => {
    console.log(snapShot.key, snapShot.val());
});

ref.push({
    description: "C",
    note: "note C",
    amount: "3",
    createdAt: "3"
})

