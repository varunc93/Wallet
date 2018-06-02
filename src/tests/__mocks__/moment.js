const moment = require.requireActual('moment'); //This is done since if we use import moment from 'moment', it will get the mock
//function and we will get a stack error since a function will be trying to call itself

export default (timestamp = 0) => {
    return moment(timestamp);
};