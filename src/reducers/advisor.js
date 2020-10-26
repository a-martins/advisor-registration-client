import { ACTION_TYPE } from '../actions/advisor'

const initialState = {
    list: []
}

export const advisor = (state = initialState, action) => {

    switch (action.type) {

        case ACTION_TYPE.FETCH_ALL:
            return {
                ...state,
                list: [...action.payload]
            }

        default:
            return state;

    }
}