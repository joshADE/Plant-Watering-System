import { ACTION_TYPES } from "../actions/plant";

const initialState = {
    plants: []
}

export const plantReducer = (state = initialState, action) => {
    switch(action.type) {
        case ACTION_TYPES.FETCH_ALL:
            return {
                ...state,
                plants: [...action.payload]
            }
        case ACTION_TYPES.CREATE:
            return {
                ...state,
                plants: [...state.plants, action.payload]
            }
        case ACTION_TYPES.UPDATE:
            return {
                ...state,
                plants: state.plants.map(x => x.id === action.payload.id ? action.payload : x)
            }
        case ACTION_TYPES.DELETE:
            return {
                ...state,
                plants: state.plants.filter(x => x.id !== action.payload)
            }
        case ACTION_TYPES.UPDATE_WATERING_STATUS:
            return {
                ...state,
                plants: [...action.payload]
            }
        default: return state
    }
}

export const selectPlantState = state => state.plant;

