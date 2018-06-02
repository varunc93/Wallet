const person = {
    name: "VC",
    age: 24,
    location: {
        place: "Home",
        temp: 30
    }
}

const {name, age} = person; //allows you to split the object into different variables. name will look for person[name] and map it.

console.log(`${name} is ${age} years old.`); //We don't need to use person.name as name gets mapped to person.name

// const {place, temp} = person.location;

// console.log(`It's ${temp} degrees in ${place}`);

const {place = "Earth", temp: temperature} = person.location; //Since variables are matched exactly, temp to person.location.temp, this syntax can be used for renaming
//We can set default values for example place = "Earth"
console.log(`It's ${temperature} degrees in ${place}`);

//We can also use
// const {place: city = "Earth", temp: temperature} = person.location;


//Destructuring Arrays
const address = ["Street", "City", 12345];
const [street, city, zipcode] = address; //matches to the position in the array and not the name.
//const [, city = "DefaultCity"] = address; //To skip street and zipcode and get only city with a default value of DefaultCity.

console.log(`My address is in ${street}, ${city} with the zipcode ${zipcode}`);