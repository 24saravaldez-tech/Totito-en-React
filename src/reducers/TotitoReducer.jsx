import { inicio } from "../types/initialTypes"

const initialState = {
    opcionInicio: ''
}

const reducer = (state, action) => {
    switch (action.type) {
        case inicio.seleccionar:
            return {
                ...state,
                opcionInicio: action.payload.opcionInicio
            };
            break
        default:
            break;
        // return state
    }
}

export { reducer }