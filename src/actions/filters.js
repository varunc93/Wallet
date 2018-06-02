//Action Generators

//Filters

export const setTextFilter = (text = '') => ({
    type: "SET_TEXT_FILTER",
    text
});

export const sortByAmount = (sortBy = "amount") => ({
    type: "SORT_BY_AMOUNT",
    sortBy
});

export const sortByDate = (sortBy = "date") => ({
    type: "SORT_BY_DATE",
    sortBy
});

export const setStartDate = (startDate) => ({
    type: "SET_START_DATE",
    startDate
});

export const setEndDate = (endDate) => ({
    type: "SET_END_DATE",
    endDate
});