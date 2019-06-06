const defaultState = {
    contents: [],
    redirectTo: null,
}

const contents = (state = defaultState, action) => {
    switch (action.type) {
        case 'LOAD_CONTENTS':
            return {
                ...state,
                contents: action.payload.contents,
            }
        case 'OK':
            return {
                ...state,
                redirectTo: '/'
            }
        default:
            return state
    }
}

export default contents;