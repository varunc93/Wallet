const promise = new Promise((resolve, reject) => {//if the promise works then we get a resolve else we get a reject
    setTimeout(() => {
        resolve('This is my new resolved data!')
    }, 4000);
});

promise.then((data) => {//then allows to print whatever the Promise gets as the output once it runs
    console.log(data);
});

//You can resolve and reject a promise and you can only resolve or reject a promise once and you can pass on a single argument

//Similarly for reject

const promise2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject('Something went wrong!');
    }, 2000)
});

promise2.then((data) => {
    console.log(data);
}).catch((error) =>
{
    console.log("Error: ", error);
});

//OR
// promise2.then((data) => {
//     console.log(data);
// }, (error) =>
// {
//     console.log("Error: ", error);
// });


// promise2.then((data) => { //Promise chaining
//     console.log(1);
//     return 'some data';
// }).then((returnData) => {//The second then will only have an argument passed if the previous then returns something
//     console.log(2);
// }).catch((error) =>
// {
//     console.log("Error: ", error);
// });