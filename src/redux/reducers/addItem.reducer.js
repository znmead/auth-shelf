const addItemReducer = (state = { itemDescription: '', itemUrl: '' }, action) => {
    let newState = { ...state };

    switch (action.type) {
        case 'SET_ITEM_DESC':
            newState.itemDescription = action.payload;
            return newState;
        case 'SET_ITEM_URL':
            newState.itemUrl = action.payload;
            return newState;
        case 'RESET_ADD_ITEM':
            return { itemDescription: '', itemUrl: '' };
        default:
            return state;
    };
};

export default addItemReducer;