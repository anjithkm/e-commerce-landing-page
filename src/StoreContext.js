import React from 'react';

const initialState = {
    cart:[],
    count: 0,
    totalPrice:0,
};

export const storeContext = React.createContext(initialState);

export default storeContext._currentValue;