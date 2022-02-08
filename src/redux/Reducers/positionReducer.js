const initialState = {val:1};

function positionReducer (state , action) {
    if(typeof state !=='undefined'){
    }
    if (typeof state === 'undefined') {
        return initialState
    } else if (action.type === "POSITION") {
        return {
            ...state,
            val:action.payload1,
        }
    } else {
        return state
    }
}
export default positionReducer;
