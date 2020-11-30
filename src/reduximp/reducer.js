const initialState = {
    users: [],
    user:{},
    auth:false
}

function reducer(state = initialState, action) {
    switch (action.type) {
        case "STORE_DATA":
            return {
                ...state,
                users: action.token
            };
        case "SINGLE_USER":
            return {
                ...state,
                user: action.token
            };
        case "AUTHORIZATION":
            return{
                ...state,
                auth: action.token
            }
        default:
            return state;
    }
}

export default reducer;