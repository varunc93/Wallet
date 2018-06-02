import {createStore} from 'redux';

//Reducer - is what tells the store what change to make to the store values
//Reducers - are true functions i.e, output is determined only by the input, and does not interact with environment outside its scope.
//Reducers - never change state or action arguments

const countReducer = (state = { count:0 }, action) => { //Sets the initial state values
    switch (action.type) { //Switch is preferred over if-else
        case "INCREMENT":
            return {
                count: state.count + action.incrementBy
            };
        case "DECREMENT":
            return {
                count: state.count - action.decrementBy
            };
        case "RESET":
            return {
                count: 0
            };
        case "SET":
            return {
                count: action.count
            };
        default:
            return state;
    }
};

const store = createStore(countReducer);

//Action Generators - functions that can be called to perform a type of action
// const incrementCount = (payload = {}) => ({
//     type: "INCREMENT",
//     incrementBy: typeof payload.incrementBy === "number" ? payload.incrementBy : 1
// });

//We can use destructuring to simply further

const incrementCount = ({incrementBy = 1} = {}) => ({
    type: "INCREMENT",
    incrementBy
})

const decrementCount = ({decrementBy = 1} = {}) => ({
    type: "DECREMENT",
    decrementBy
})

const setCount = ({count = 1} = {}) => ({
    type: "SET",
    count
})

const resetCount = () => ({
    type: "RESET",
})

const unsubscribe = store.subscribe(() => { //gets called each time the store changes. The return value for subscribe is a function to unsubscribe
    console.log(store.getState()); //Gets current State
});

//States in redux are changed using actions
//For eg: walk, stop_walking, run, jump, stop_walking

//Incrementing count by one value, we need to pass in an action using dispatch
// store.dispatch({
//     type: "INCREMENT",   //Redux uses all caps
//     incrementBy: 15 //custom values can be passed to the store to update the state
// });

// store.dispatch({
//     type: "DECREMENT",   //Redux uses all caps
//     decrementBy: 10
// });

// unsubscribe(); //We stop getting updates past this point

// store.dispatch({
//     type: "RESET"
// });

// store.dispatch({
//     type: "SET",
//     count: 100
// });

store.dispatch(
    incrementCount({incrementBy: 15})
);

store.dispatch(
    decrementCount({decrementBy: 10})
);

store.dispatch(
    setCount({count: 5})
);

unsubscribe();

store.dispatch(
    resetCount()
);


console.log(store.getState());
