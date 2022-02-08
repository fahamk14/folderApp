const initialState = {
    arr:[
        { 
            id: 0, 
            title: "Home", 
            subcategories: [],
            depth:1
          }
    ]
}

function folderListArrReducer (state , action) {
    if(typeof state !=='undefined'){
    }
    if (typeof state === 'undefined') {
        return initialState
    } else if (action.type === "FOLDERLIST") {
        return {
            ...state,
            arr:action.payload1,
        }
    } else {
        return state
    }
}
export default folderListArrReducer;
