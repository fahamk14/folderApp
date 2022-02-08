const initialState = {val:""};

function positionReducer (state , action) {
    if(typeof state !=='undefined'){
    }
    if (typeof state === 'undefined') {
        return initialState
    } else if (action.type === "FORWARD") {
        return {
            ...state,
            val:action.payload1,
        }
    } else {
        return state
    }
}
export default positionReducer;
